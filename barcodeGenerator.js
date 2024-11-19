// Funzione per generare il PDF
function generatePDF(barcodeData, description) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margin = 10;
    const cols = 8; // 8 colonne
    const rows = 3; // 3 righe
    const width = (doc.internal.pageSize.width - margin * 2) / cols;
    const height = (doc.internal.pageSize.height - margin * 2) / rows;

    // Ciclo per generare i codici a barre nelle celle
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const x = margin + j * width;
            const y = margin + i * height;

            // Genera il codice a barre con JsBarcode
            JsBarcode("#barcode", barcodeData, {
                format: "EAN13",
                width: width * 0.7,
                height: height * 0.6,
                displayValue: false
            });

            // Ottieni l'immagine SVG del codice a barre
            const barcodeSVG = document.querySelector('#barcode');
            const barcodeDataUrl = barcodeSVG.outerHTML;

            // Aggiungi il codice a barre nel PDF
            doc.svg(barcodeDataUrl, {
                x: x,
                y: y,
                width: width * 0.7,
                height: height * 0.6
            });

            // Aggiungi la descrizione sotto il codice a barre
            doc.setFontSize(8);
            doc.text(description, x, y + height * 0.7);
        }
    }

    // Salva il PDF generato
    doc.save("barcodes.pdf");
}

// Funzione per generare il barcode e creare il PDF
function generateBarcode() {
    const ean = document.getElementById('ean').value;
    const description = document.getElementById('description').value;

    // Verifica che l'input EAN-13 sia valido (13 cifre) e che la descrizione non sia vuota
    if (ean.length === 13 && description) {
        // Genera il barcode
        JsBarcode("#barcode", ean, {
            format: "EAN13",
            width: 2,
            height: 40,
            displayValue: false
        });

        // Crea e scarica il PDF
        generatePDF(ean, description);
    } else {
        alert("Per favore, inserisci un codice EAN-13 valido e una descrizione.");
    }
}