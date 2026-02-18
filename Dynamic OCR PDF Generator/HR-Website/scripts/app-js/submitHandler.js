//import { displayPDF } from "../support-js/displayPDF";
import { extractFormData } from "../support-js/extractFormData.js";

export async function submitHandler() {
    const formElement = document.getElementById("ds46-form");

    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        // retrieve PDFdata from the form and then pass it onto the display form
        const PDFdata = extractFormData(formElement);
        console.log("Extracted PDF Data:", PDFdata);

        // this function, 'displayPDF' is meant to use the pdflib framework and then display the PDF in the iframe.
        //displayPDF(PDFdata);
        console.log("Form submitted");
    });
}