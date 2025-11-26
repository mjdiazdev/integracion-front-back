const MovimientoContable = require('../models/movimientoContable.model');
const CuentaContable = require('../models/cuentaContable.model');
const { Op } = require('sequelize');

exports.generarLibroDiario = async (req, res) => {
    try {
        const { fecha, desde, hasta } = req.query;

        let where = {};

        // Si envía una fecha exacta (2025-01-15)
        if (fecha) {
            where.fecha = fecha;
        }

        // Si envía un rango de fechas (desde=2025-01-01&hasta=2025-01-31)
        if (desde && hasta) {
            where.fecha = {
                [Op.between]: [desde, hasta]
            };
        }

        const movimientos = await MovimientoContable.findAll({
            where,
            include: [
                {
                    model: CuentaContable,
                    as: 'cuenta',
                    attributes: ['codigo', 'nombre']
                }
            ],
            order: [['fecha', 'ASC'], ['id', 'ASC']]
        });

        if (movimientos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron movimientos para la fecha indicada.' });
        }

        // Formato final del libro diario
        const libroDiario = movimientos.map(m => ({
            fecha: m.fecha,
            cuenta: `${m.cuenta.codigo} - ${m.cuenta.nombre}`,
            descripcion: m.descripcion,
            debe: m.tipo === 'debe' ? m.monto : 0,
            haber: m.tipo === 'haber' ? m.monto : 0,
            movimiento: {
                type: m.movimiento_type,
                id: m.movimiento_id
            }
        }));

        res.json({
            total: movimientos.length,
            libro_diario: libroDiario
        });

    } catch (error) {
        console.error("Error generar libro diario:", error);
        res.status(500).json({
            message: "Error al generar el libro diario",
            details: error.message
        });
    }
};
