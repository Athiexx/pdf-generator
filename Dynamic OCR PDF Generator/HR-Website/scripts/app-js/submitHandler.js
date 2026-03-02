//import { displayPDF } from "../support-js/displayPDF";
import { extractFormData } from "../support-js/extractFormData.js";
import { generatePDF } from "../support-js/generatePDF.js";

export async function submitHandler() {
    const formElement = document.getElementById("ds46-form");

    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        // retrieve PDFdata from the form and then pass it onto the generate PDF function
        const PDFdata = extractFormData(formElement);
        console.log("Extracted PDF Data:", PDFdata);

        // Generate and display the PDF in the iframe
        await generatePDF(PDFdata);
        console.log("Form submitted and PDF generated");
    });
}