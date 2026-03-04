import { PDFDocument, StandardFonts } from '../library-js/pdf-lib.esm.min.js';
import { getAllFormInputTypes } from './getAllFormInputTypes.js';
export async function generatePDF(pdfData) {

  // initialize inputTypes object to hold the type and value of each form input, which will be used to determine how to fill the PDF form fields
  let inputTypes = new Object();
  inputTypes = await getAllFormInputTypes();
  let pdfDoc = new Object();

  // Load the PDF template
  const pdfPath = './forms/DS 46 New.pdf';
  const pdfResponse = await fetch(pdfPath);

  if (!pdfResponse.ok) {
    throw new Error(`Failed to load PDF template: ${pdfResponse.status}`);
  }

  // turn the pdf into raw binary data
  const pdfBytes = await pdfResponse.arrayBuffer();

  // Load the PDF document. Loads as a PDFDocument object that we can manipulate with pdf-lib
  pdfDoc = await PDFDocument.load(pdfBytes);


  // Get the form fields and set the fonts
  const formData = pdfDoc.getForm();
  const fonts = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  //const test = formData.getTextField("Text Box - MPD");
  //const test2 = pdfData['Text Box - MPD'];
  //console.log("Test field object (test):", test);
  //console.log("Test field value (test2):", test2);

  //test.setText(test2 || '');
  // test.setText(pdfData['Text Box - MPD'] || '');
  //form.getTextField("Text Box - BUREAU").setText(pdfData['Text Box - BUREAU'] || '');


  Object.keys(pdfData).forEach(fieldName => {

    let pdfField = formData.getFieldMaybe(fieldName);  // Get FIELD OBJECT from Form
    let fieldValue = pdfData[fieldName];  // Get VALUE from PDF
    
    // Get the input type and id from the inputTypes object
    let type = inputTypes[fieldName].type;  // Get only the type
    let value = inputTypes[fieldName].value; // Get only the value (for radio buttons)

    if (pdfField) {

      try {
        if (type === 'text') {
          // Set text field value for the PDF form, defaulting to empty string if value is undefined
          pdfField.setText(fieldValue || '');
          console.log(`Filled TEXT field: "${fieldName}" with value: "${fieldValue || ''}"`);
        }
        // Set radio button value for the PDF form, only if fieldValue is not undefined or empty 
        else if (type === 'radio') {
          
          pdfField.select(value || '');
          console.log(`Filled RADIO field: "${fieldName}" with value: "${fieldValue || ''}"`);
        }
      } catch (error) {
        console.error(`Failed to fill field "${fieldName}":`, error.message);
      }
    } else {
      console.warn(`Field "${fieldName}" NOT FOUND in PDF form`);
    }
  });

  formData.updateFieldAppearances(fonts);

  // Save the PDF
  const generatedPdfBytes = await pdfDoc.save();
  // get iframe element

  // Create blob and display in iframe
  const blob = new Blob([generatedPdfBytes], { type: "application/pdf" });
  const blobUrl = URL.createObjectURL(blob);

  const iframe = document.getElementById("pdf-iframe");

  // Revoke old blob URL to prevent memory leaks
  if (iframe) {
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

  return blob;
}
