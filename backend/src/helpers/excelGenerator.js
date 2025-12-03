const ExcelJS = require("exceljs");
const path = require("path");

exports.generarExcelLibroDiario = async (data, fechaTitulo) => {
    const filePath = path.join(__dirname, `../public/libro-diario-${Date.now()}.xlsx`);
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Libro Diario");

    // TÍTULO
    sheet.mergeCells("A1:E1");
    sheet.getCell("A1").value = "Libro Diario";
    sheet.getCell("A1").font = { size: 16, bold: true };

    sheet.getCell("A2").value = `Fecha: ${fechaTitulo}`;
    sheet.getCell("A2").font = { bold: true };

    // ENCABEZADO
    sheet.addRow(["Fecha", "Cuenta", "Descripción", "Debe", "Haber"]);
    sheet.getRow(3).font = { bold: true };

    let totalDebe = 0;
    let totalHaber = 0;

    data.forEach(item => {
        sheet.addRow([
            item.fecha,
            item.cuenta,
            item.descripcion,
            item.debe > 0 ? item.debe : "",
            item.haber > 0 ? item.haber : ""
        ]);

        totalDebe += item.debe;
        totalHaber += item.haber;
    });

    // TOTALES
    sheet.addRow([]);
    sheet.addRow(["", "", "Totales", totalDebe, totalHaber]);
    sheet.getRow(sheet.rowCount).font = { bold: true };

    await workbook.xlsx.writeFile(filePath);
    return filePath;
};
