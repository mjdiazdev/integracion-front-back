const MovimientoContable = require('../models/movimientoContable.model');
const CuentaContable = require('../models/cuentaContable.model');
const { Op } = require('sequelize');

const { generarPDFLibroDiario } = require('../helpers/pdfGenerator');
const { generarExcelLibroDiario } = require('../helpers/excelGenerator'); // este puede seguir igual

/**
 * Exporta el libro diario en PDF o Excel o devuelve JSON.
 */
exports.exportarLibroDiario = async (req, res) => {
    try {
        const { fecha, desde, hasta, formato } = req.query;
        let where = {};

        // Filtros
        if (fecha) where.fecha = fecha;
        if (desde && hasta) {
            where.fecha = { [Op.between]: [desde, hasta] };
        }

        // Consulta de movimientos
        const movimientos = await MovimientoContable.findAll({
            where,
            include: [
                {
                    model: CuentaContable,
                    as: "cuenta",
                    attributes: ["codigo", "nombre"]
                }
            ],
            order: [["fecha", "ASC"], ["id", "ASC"]]
        });

        if (movimientos.length === 0) {
            return res.status(404).json({ message: "No hay movimientos." });
        }

        // Agrupar por movimiento_id (asiento)
        const asientos = {};

        movimientos.forEach(m => {
            if (!asientos[m.movimiento_id]) {
                asientos[m.movimiento_id] = [];
            }

            asientos[m.movimiento_id].push({
                fecha: m.fecha,
                cuenta: `${m.cuenta.codigo} - ${m.cuenta.nombre}`,
                descripcion: m.descripcion || "",
                debe: m.tipo === "debe" ? parseFloat(m.monto) : 0,
                haber: m.tipo === "haber" ? parseFloat(m.monto) : 0
            });
        });


        const etiquetaFecha = fecha || `${desde} a ${hasta}`;

        // Exportar PDF en memoria (sin guardar en disco)
        if (formato === "pdf") {
            const pdfBuffer = await generarPDFLibroDiario(asientos, etiquetaFecha);

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename=libro-diario-${Date.now()}.pdf`
            );

            return res.send(pdfBuffer);
        }

        // Exportar Excel (si usas un helper basado en archivos, puede seguir igual)
        if (formato === "excel") {
            const filePath = await generarExcelLibroDiario(libro, etiquetaFecha);
            return res.download(filePath);
        }

        // JSON por defecto
        return res.json(libro);

    } catch (error) {
        console.error("Error al exportar libro diario:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};
