    // DRAW PDF. For generating forms that needs to be displayed

import { rgb } from 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.esm.min.js';

export function drawPDF(page, fields, headerText, fonts) {
    const { height } = page.getSize();
    const margin = 50;
    const linespacing = 30;

    // 1. Draw Header
    page.drawText(headerText, {
        x: margin,
        y: height - margin,
        size: 22,
        font: fonts.bold,
        color: rgb(0, 0, 0)
    });

    // 2. Draw Fields
    fields.forEach((field, index) => {
        const yPosition = height - (margin + 70 + (index * linespacing));
        const label = `${field[0]}: `;
        const value = String(field[1] || 'N/A');

        // Draw Label (Bold)
        page.drawText(label, {
            x: margin,
            y: yPosition,
            size: 14,
            font: fonts.bold
        });

        const labelWidth = fonts.bold.widthOfTextAtSize(label, 14);

        // Draw Value (Regular)
        page.drawText(value, {
            x: margin + labelWidth,
            y: yPosition,
            size: 14,
            font: fonts.regular
        });
    });
}
