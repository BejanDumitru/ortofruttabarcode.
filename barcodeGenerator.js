<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generatore Barcode EAN-13</title>

    <!-- JsBarcode CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.0/JsBarcode.all.min.js"></script>

    <!-- jsPDF CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
</head>
<body>
    <h1>Generatore Barcode EAN-13</h1>

    <!-- Input per il codice EAN-13 -->
    <label for="ean">Inserisci il codice EAN-13:</label>
    <input type="text" id="ean" maxlength="13" placeholder="EAN-13" required>
    <br>

    <!-- Input per la descrizione -->
    <label for="description">Inserisci la descrizione:</label>
    <input type="text" id="description" placeholder="Descrizione" required>
    <br>

    <!-- Bottone per generare il PDF -->
    <button onclick="generatePDF()">Genera PDF</button>

    <!-- Dove visualizzare il codice a barre -->
    <div id="barcode-container">
        <svg id="barcode"></svg>
    </div>

    <script>
        function generatePDF() {
            // Ottieni il codice EAN-13 inserito
            const ean = document.getElementById("ean").value.trim(); // Rimuovi eventuali spazi
            const description = document.getElementById("description").value.trim();

            // Verifica che il codice EAN-13 sia valido (13 cifre numeriche)
            if (ean.length === 13 && /^[0-9]+$/.test(ean)) {
                // Usa JsBarcode per generare il codice a barre SVG
                JsBarcode("#barcode", ean, {
                    format: "EAN13",
                    lineColor: "#0aa",
                    width: 4,
                    height: 40,
                    displayValue: false // Non mostrare il valore sotto il codice a barre
                });

                // Crea un nuovo documento PDF
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                // Aggiungi il codice a barre al PDF
                const barcodeImage = document.getElementById('barcode').children[0];
                const imgData = barcodeImage.toDataURL('image/png');
                doc.addImage(imgData, 'PNG', 10, 10, 180, 30);

                // Aggiungi la descrizione al PDF
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                doc.text(10, 50, `Descrizione: ${description}`);

                // Scarica il PDF
                doc.save("barcode.pdf");
            } else {
                // Se il codice EAN non è valido, mostra un messaggio di errore
                alert("Il codice EAN-13 deve essere composto da 13 cifre numeriche!");
            }
        }
    </script>
</body>
</html>
