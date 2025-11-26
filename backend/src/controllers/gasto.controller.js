const sequelize = require('../config/database');
const { Gasto, Servicio, CuentaContable, MovimientoContable } = require('../models');

exports.registrar = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { servicio_id, fecha, monto, descripcion, cuenta_gasto_codigo, cuenta_pago_codigo } = req.body;

    if (!servicio_id || !fecha || !monto) {
      await t.rollback();
      return res.status(400).json({ error: 'servicio_id, fecha y monto son obligatorios' });
    }

    // Validar servicio
    const servicio = await Servicio.findByPk(servicio_id);
    if (!servicio) {
      await t.rollback();
      return res.status(404).json({ error: 'Servicio no existe' });
    }

    // 1. Registrar gasto
    const gasto = await Gasto.create({
      servicio_id,
      fecha,
      monto,
      descripcion
    }, { transaction: t });

    // 2. Obtener cuentas contables
    const codigoGasto = cuenta_gasto_codigo || '5.1.01'; // Gastos generales
    const codigoPago = cuenta_pago_codigo || '1.1.01';   // Caja/Bancos

    const cuentaGasto = await CuentaContable.findOne({ where: { codigo: codigoGasto }, transaction: t });
    const cuentaPago = await CuentaContable.findOne({ where: { codigo: codigoPago }, transaction: t });

    if (!cuentaGasto || !cuentaPago) {
      await t.rollback();
      return res.status(400).json({ error: 'No existen las cuentas contables enviadas' });
    }

    // 3. Movimientos contables
    const movimientos = [
      {
        cuenta_contable_id: cuentaGasto.id,
        monto,
        tipo: 'debe',
        movimiento_type: 'Gasto',
        movimiento_id: gasto.id,
        descripcion: `Gasto por servicio: ${servicio.nombre}`,
        fecha
      },
      {
        cuenta_contable_id: cuentaPago.id,
        monto,
        tipo: 'haber',
        movimiento_type: 'Gasto',
        movimiento_id: gasto.id,
        descripcion: `Pago de gasto por servicio: ${servicio.nombre}`,
        fecha
      }
    ];

    await MovimientoContable.bulkCreate(movimientos, { transaction: t });

    await t.commit();

    res.status(201).json({ msg: 'Gasto registrado y movimiento contable creado', gasto });

  } catch (err) {
    console.error('Error registrar gasto:', err);
    await t.rollback();
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
