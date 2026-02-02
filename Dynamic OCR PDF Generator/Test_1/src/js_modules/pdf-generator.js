// pdf-generator.js
// This file creates a brand-new PDF Document in memory

import { PDFDocument, StandardFonts, rgb } from 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.esm.min.js';
export { generatePdf };

// 1. Global Layout & Colors
const margin = 50;
const linespacing = 30;
const mainColor = rgb(0, 0, 0); // Dark Green

// 2. Header Configuration
const headerText = 'Employee Information Form';
const headerConfig = {
  size: 25,
  color: mainColor,
  underline: true,
  thickness: 2
};

// 3. Form Field Configuration
const labelConfig = {
  fontSize: 14,
  color: mainColor,
  bold: true // We will use this to pick the font
};

// Form Field Label Strings
const labels = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  title: "Work Title",
  bureau: "Bureau",
  location: "Work Location"
};

// Returns the promise of creating a new pdf
async function generatePdf(formObject) {

  // Create a new PDF Document with TimesRoman font
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanFontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // Add a new page and get the size of the page
  // Log the page's width and height for debugging
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  console.log('Page Width:', width, 'Page Height:', height);


  // 1. Draw the Header Text, calculate width of text for underline
  const textWidth = timesRomanFontBold.widthOfTextAtSize(headerText, headerConfig.size);

  // Header Information
  page.drawText(headerText, {
    x: margin,
    y: height - margin,
    size: headerConfig.size,
    font: timesRomanFontBold,
    color: headerConfig.color
  });

  page.drawLine({
    start: { x: margin, y: height - margin - 5 },
    end: { x: margin + textWidth, y: height - margin - 5 },
    thickness: headerConfig.thickness,
    color: headerConfig.color,
  });

  const fields = [
    [labels.firstName, formObject.firstname],
    [labels.lastName, formObject.lastname],
    [labels.email, formObject.email],
    [labels.title, formObject.title],
    [labels.bureau, formObject.bureau],
    [labels.location, formObject.location]
  ];

  fields.forEach((field, index) => {
    const yPosition = height - (margin + 70 + (index * linespacing));
    const label = `${field[0]}: `;
    const value = String(field[1] || ''); // Ensure value is a string

    // 1. Draw the Label (BOLD)
    page.drawText(label, {
      x: margin,
      y: yPosition,
      size: labelConfig.fontSize,
      font: timesRomanFontBold, // Explicitly use Bold here
      color: labelConfig.color
    });

    // 2. Calculate the width of the label we just drew
    const labelWidth = timesRomanFontBold.widthOfTextAtSize(label, labelConfig.fontSize);

    // 3. Draw the Value (REGULAR)
    // We start the X position at (margin + labelWidth)
    page.drawText(value, {
      x: margin + labelWidth,
      y: yPosition,
      size: labelConfig.fontSize,
      font: timesRomanFont, // Explicitly use Regular here
      color: labelConfig.color
    });
  });

  // Create the PDF bytes and a Blob URL to display in the iframe
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  const iframe = document.getElementById('pdf-iframe');

  // Check to see if iframe exists before setting src
  if (iframe) {
    if (iframe.src && iframe.src.startsWith('blob:')) {
      URL.revokeObjectURL(iframe.src);
    }
    iframe.src = blobUrl;
    console.log('PDF displayed in iframe');
  } 
  // Open PDF in new tab if iframe does not exist
  else {
    window.open(blobUrl, '_blank');
    console.error('Error: Could not find an iframe with id "pdf-iframe"');
  }
}