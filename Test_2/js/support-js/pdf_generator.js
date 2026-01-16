import { PDFDocument, StandardFonts, rgb } from 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.esm.min.js';

export async function generatePDF(formObject, formId) {
    // 1. Setup Document and Fonts
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanFontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    const page = pdfDoc.addPage();
    const { height } = page.getSize();
    const margin = 50;
    const linespacing = 30;

    let headerText = "";
    let fields = [];

    // 2. Map Data Based on Form ID
    if (formId === 'cpDocument-form-display-container') {
        headerText = "Capital Budget CP Document";
        fields = [
            ["CP Number", formObject['cpDocument-cpNumber']],
            ["Dollar Amount", `$${formObject['cpDocument-cpDollarAmount']}`],
            ["Fiscal Year", formObject['cpDocument-fiscalYear']],
            ["CP Requested Date", formObject['cpDocument-RequestedDate']],
            ["CP Approval Date", formObject['cpDocument-ApprovalDate']],
            ["Fund", formObject['cpDocument-fund']],
            ["Department Code", formObject['cpDocument-departmentCode']],
            ["UA Code", formObject['cpDocument-UA']],
            ["Budget Code", formObject['cpDocument-budgetCode']],
            ["Object Code", formObject['cpDocument-objectCode']],
            ["Supersede CP By", formObject['cpDocument-supersedeCPBy']],
            ["Supersede CP Date", formObject['cpDocument-supersedeCPDate']]
        ];
    } else {
        headerText = "Employee Information Form";
        fields = [
            ["First Name", formObject['employeeInfo-firstname']],
            ["Last Name", formObject['employeeInfo-lastname']],
            ["Employee ID", formObject['employeeInfo-ID']],
            ["Email", formObject['employeeInfo-email']],
            ["Bureau", formObject['employeeInfo-bureau']],
            ["Position", formObject['employeeInfo-position']],
            ["Location", formObject['employeeInfo-location']]

        ];
    }

    // 3. Draw Header
    page.drawText(headerText, {
        x: margin,
        y: height - margin,
        size: 22,
        font: timesRomanFontBold,
        color: rgb(0, 0, 0)
    });

    // 4. Draw Fields
    fields.forEach((field, index) => {
        const yPosition = height - (margin + 70 + (index * linespacing));
        const label = `${field[0]}: `;
        const value = String(field[1] || 'N/A');

        // Draw Label (Bold)
        page.drawText(label, {
            x: margin,
            y: yPosition,
            size: 14,
            font: timesRomanFontBold
        });

        const labelWidth = timesRomanFontBold.widthOfTextAtSize(label, 14);

        // Draw Value (Regular)
        page.drawText(value, {
            x: margin + labelWidth,
            y: yPosition,
            size: 14,
            font: timesRomanFont
        });
    });

    // 5. Generate Blob and Update Iframe
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    const iframe = document.getElementById('pdf-iframe');

    if (iframe) {
        // Clean up memory if a previous PDF exists
        if (iframe.src.startsWith('blob:')) {
            URL.revokeObjectURL(iframe.src);
        }
        iframe.src = blobUrl;
        if (iframe.classList.contains('is-hidden')) {
            iframe.classList.remove('is-hidden');
        }
        console.log('PDF rendered to iframe successfully.');
    } else {
        // Fallback if iframe is missing
        window.open(blobUrl, '_blank');
        console.warn('Iframe not found; opened PDF in new tab.');
    }

    // return the blob so submit_handler.js is able to retrieve it and upload it to Alfresco
    return blob;
}
