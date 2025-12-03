const PDFDocument = require('pdfkit');

exports.generarPDFLibroDiario = (asientos, fechaTitulo) => {
    return new Promise((resolve, reject) => {

        const PDFDocument = require("pdfkit");
        const doc = new PDFDocument({ margin: 50 });

        let chunks = [];
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", reject);

        // ---- TITULO ----
        doc.fontSize(20).text("Libro Diario", { align: "left" });
        doc.moveDown(0.5);
        doc.fontSize(12).text(`Fecha: ${fechaTitulo}`);
        doc.moveDown(1);

        // ---- DIMENSIONES ----
        const tableTop = doc.y;
        const colWidths = [80, 170, 140, 70, 70];
        const startX = 50;

        // Función para dibujar bordes de celda
        function drawCell(x, y, width, height) {
            doc.rect(x, y, width, height).stroke();
        }

        // Función para escribir texto centrado
        function writeText(text, x, y, width, align = "left") {
            doc.text(text, x + 3, y + 6, { width: width - 6, align });
        }

        // ---- ENCABEZADO DE COLUMNAS ----
        let y = tableTop;

        doc.font("Helvetica-Bold");
        const headers = ["Fecha", "Cuenta", "Descripción", "Debe", "Haber"];

        headers.forEach((header, i) => {
            const x = startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
            drawCell(x, y, colWidths[i], 25);
            writeText(header, x, y, colWidths[i], "center");
        });

        y += 25;
        doc.font("Helvetica");

        let totalDebe = 0;
        let totalHaber = 0;
        let numAsiento = 1;

        // ---- RECORRER ASIENTOS ----
        for (const movimiento_id of Object.keys(asientos)) {

            // ---- FILA DEL ASIENTO ----
            drawCell(startX, y, colWidths[0], 25);
            writeText("Fecha", startX, y, colWidths[0]);

            drawCell(startX + colWidths[0], y, colWidths[1], 25);

            drawCell(startX + colWidths[0] + colWidths[1], y, colWidths[2], 25);
            writeText(`-${numAsiento}-`, startX + colWidths[0] + colWidths[1], y, colWidths[2], "center");

            drawCell(startX + colWidths[0] + colWidths[1] + colWidths[2], y, colWidths[3], 25);
            drawCell(startX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], y, colWidths[4], 25);

            y += 25;

            // ---- LÍNEAS DEL ASIENTO ----
            for (const item of asientos[movimiento_id]) {
                const vals = [
                    item.fecha,
                    item.cuenta,
                    item.descripcion,
                    item.debe ? item.debe.toFixed(2) : "",
                    item.haber ? item.haber.toFixed(2) : ""
                ];

                vals.forEach((val, i) => {
                    const x = startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
                    drawCell(x, y, colWidths[i], 25);
                    writeText(val, x, y, colWidths[i], i >= 3 ? "right" : "left");
                });

                totalDebe += item.debe;
                totalHaber += item.haber;

                y += 25;
            }

            numAsiento++;
        }

        // ---- TOTALES ----
        doc.font("Helvetica-Bold");

        drawCell(startX, y, colWidths[0] + colWidths[1] + colWidths[2], 25);
        writeText("Totales", startX, y, colWidths[0] + colWidths[1] + colWidths[2]);

        drawCell(startX + colWidths[0] + colWidths[1] + colWidths[2], y, colWidths[3], 25);
        writeText(totalDebe.toFixed(2), startX + colWidths[0] + colWidths[1] + colWidths[2], y, colWidths[3], "right");

        drawCell(startX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], y, colWidths[4], 25);
        writeText(totalHaber.toFixed(2), startX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], y, colWidths[4], "right");

        doc.end();
    });
};

