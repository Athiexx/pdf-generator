// This piece of Javascript code handles the submission of the HTML form
// It prevents the default submission behavior, extracts the form data,
// and attempts to create a PDF document using that data.
import { generatePdf } from './pdf-generator.js';

const form = document.getElementById('employee-form');

form.addEventListener('submit', async (submissionHandler) => {
  // Prevent the default form submission behavior
  submissionHandler.preventDefault();

  // If the form is not found return an error message
  if (!form) {
    const warn = "There was an issue retrieving the form data.";
    document.getElementById('employee-form-output-container').innerText += warn;
    console.error('Form element not found');
    return;
  }

  // Extract form data into an Java object
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  //View the form data object in the console for debugging
  console.log('Form Data Object:', formObject);

  // Test to see if creating the PDF works. If it does, log success message. If not, log error.
  try {
    await generatePdf(formObject);
    console.log('PDF created successfully');
  } catch (error) {
    console.error('Error creating PDF:', error);
  }
});