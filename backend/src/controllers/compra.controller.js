// controllers/compra.controller.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const { Compra, DetalleCompra, Producto, CuentaContable, MovimientoContable } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const compras = await Compra.findAll({
      include: [
        { model: DetalleCompra },
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(compras);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener compras' });
  }
};

exports.getById = async (req, res) => {
  try {
    const compra = await Compra.findByPk(req.params.id, {
      include: [
        { model: DetalleCompra }
      ]
    });
    if (!compra) return res.status(404).json({ error: 'Compra no encontrada' });
    res.json(compra);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

/**
 * Crear compra:
 * body = {
 *   proveedor_id,
 *   fecha, // YYYY-MM-DD o fecha válida
 *   total,
 *   detalles: [
 *     { producto_id, cantidad, precio_unitario },
 *     ...
 *   ],
 *   // Opcionalmente puedes enviar cuentas contables (si no existen en base):
 *   cuenta_inventario_codigo: '1.1.03',
 *   cuenta_pago_codigo: '1.1.01',
 * }
 */
exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { proveedor_id, fecha, total, detalles } = req.body;
    if (!proveedor_id || !fecha || total == null || !Array.isArray(detalles) || detalles.length === 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Faltan datos de la compra o detalles' });
    }

    // 1) Crear compra
    const compra = await Compra.create({
      proveedor_id,
      fecha,
      total
    }, { transaction: t });

    // 2) Preparar detalles para insert bulk
    const detallesToInsert = detalles.map(d => ({
      compra_id: compra.id,
      producto_id: d.producto_id,
      cantidad: d.cantidad,
      precio_unitario: d.precio_unitario
    }));

    // 3) Insertar detalles
    await DetalleCompra.bulkCreate(detallesToInsert, { transaction: t });

    // 4) Actualizar stock de productos (incrementar)
    // Recorremos y hacemos update por cada producto
    for (const d of detalles) {
      const producto = await Producto.findByPk(d.producto_id, { transaction: t, lock: t.LOCK.UPDATE });
      if (!producto) {
        await t.rollback();
        return res.status(400).json({ error: `Producto no encontrado (id: ${d.producto_id})` });
      }
      // incrementar stock
      const nuevaCant = producto.stock + Number(d.cantidad);
      await producto.update({ stock: nuevaCant }, { transaction: t });
    }

    // 5) Registrar movimientos contables (partida doble)
    // Intentamos encontrar cuentas por códigos enviados o por códigos por defecto
    // Buscamos por codigo '1.1.03' => Inventario, '1.1.01' => Caja (o banco)
    const inventarioCodigo = req.body.cuenta_inventario_codigo || '1.1.03';
    const pagoCodigo = req.body.cuenta_pago_codigo || '1.1.01';

    const cuentaInventario = await CuentaContable.findOne({ where: { codigo: inventarioCodigo }, transaction: t });
    const cuentaPago = await CuentaContable.findOne({ where: { codigo: pagoCodigo }, transaction: t });

    if (!cuentaInventario || !cuentaPago) {
      // Si no encuentra, hacemos rollback y avisamos
      await t.rollback();
      return res.status(400).json({ error: 'No se encontraron cuentas contables necesarias (inventario o pago). Comprueba que exista 1.1.03 y 1.1.01 o envía cuenta_inventario_codigo / cuenta_pago_codigo' });
    }

    // Movimiento debe = aumento inventario (debe), haber = salida de caja/banco
    const movimientos = [
      {
        cuenta_contable_id: cuentaInventario.id,
        monto: total,
        tipo: 'debe',
        movimiento_type: 'Compra',
        movimiento_id: compra.id,
        descripcion: `Compra #${compra.id} - Inventario`,
        fecha: new Date()
      },
      {
        cuenta_contable_id: cuentaPago.id,
        monto: total,
        tipo: 'haber',
        movimiento_type: 'Compra',
        movimiento_id: compra.id,
        descripcion: `Compra #${compra.id} - Pago`,
        fecha: new Date()
      }
    ];

    // Insertar movimientos
    await MovimientoContable.bulkCreate(movimientos, { transaction: t });

    // 6) Commit
    await t.commit();

    // Devolver compra creada con detalles
    const compraConDetalles = await Compra.findByPk(compra.id, {
      include: [{ model: DetalleCompra }],
    });

    res.status(201).json(compraConDetalles);
  } catch (err) {
    console.error('Error crear compra:', err);
    try { await t.rollback(); } catch (e) { console.error('rollback error', e); }
    res.status(500).json({ error: 'No se pudo crear la compra' });
  }
};
