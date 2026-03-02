import { PDFDocument } from '../library-js/pdf-lib.esm.min.js';

export async function generatePDF(formData) {
  try {
    // Load the PDF template
    const pdfPath = './forms/DS 46 New.pdf';
    const pdfResponse = await fetch(pdfPath);

    if (!pdfResponse.ok) {
      throw new Error(`Failed to load PDF template: ${pdfResponse.status}`);
    }

    // turn the pdf into raw binary data
    const pdfBytes = await pdfResponse.arrayBuffer();

    // Load the PDF document. Loads as a PDFDocument object that we can manipulate with pdf-lib
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get the form fields
    const form = pdfDoc.getForm();

    // Get all available PDF field names for debugging
    const allPdfFields = form.getFields().map(f => ({ name: f.getName(), type: f.getType() }));
    console.log("Available PDF Fields:", allPdfFields);
    console.log("Extracted Form Data Keys:", Object.keys(formData));

    // Fill in the form fields with extracted data
    let filledCount = 0;
    let notFoundCount = 0;
    let errorCount = 0;

    Object.keys(formData).forEach(fieldName => {
      try {
        const field = form.getField(fieldName);
        if (field) {
          const fieldType = field.getType();
          const fieldValue = String(formData[fieldName]);

          try {
            if (fieldType === 'text') {
              field.setText(fieldValue);
              console.log(`✓ Filled TEXT field: "${fieldName}" with value: "${fieldValue}"`);
              filledCount++;
            } else if (fieldType === 'radio') {
              field.select(fieldValue);
              console.log(`✓ Filled RADIO field: "${fieldName}" with value: "${fieldValue}"`);
              filledCount++;
            } else {
              console.warn(`⚠ Unsupported field type "${fieldType}" for field: "${fieldName}"`);
            }
          } catch (selectError) {
            console.error(`✗ Failed to fill field "${fieldName}" with value "${fieldValue}" (${fieldType}):`, selectError.message);
            errorCount++;
          }
        } else {
          console.warn(`✗ Field "${fieldName}" NOT FOUND in PDF form`);
          notFoundCount++;
        }
      } catch (error) {
        console.error(`✗ Critical error accessing field "${fieldName}":`, error.message);
        errorCount++;
      }
    });

    console.log(`\n📊 Summary: ${filledCount} filled, ${notFoundCount} not found, ${errorCount} errors`);
    form.updateFieldAppearances(); 
    // Save the PDF
    const generatedPdfBytes = await pdfDoc.save();
    
    const iframe = document.getElementById("pdf-iframe");

    // Revoke old blob URL to prevent memory leaks
    if (iframe.dataset.blobUrl) {
      URL.revokeObjectURL(iframe.dataset.blobUrl);
      console.log("Revoked old blob URL");
    }

    // Create blob and display in iframe
    const blob = new Blob([generatedPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    // Store the new blob URL for next time
    iframe.dataset.blobUrl = url;

    iframe.src = url;
    iframe.classList.remove("is-hidden");
    console.log("New PDF blob URL created and iframe updated");

    console.log("PDF generated and displayed successfully");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Check the console for details.");
  }
}