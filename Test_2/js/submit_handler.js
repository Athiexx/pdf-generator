import { generatePDF } from "./support-js/pdf_generator.js";

export async function submit_handler() {
    // We grab whatever form is currently injected in the DOM
    const formElement = document.querySelector('#form-content-area form');

    if (!formElement) {
        console.error("No form found to attach submit listener.");
        return;
    }

    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Dynamically get the ID (e.g., 'cpDocument-form-display-container')
        const activeFormId = event.target.id;
        
        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());

        try {
            // Pass the data and the ID to the PDF generator
            await generatePDF(formObject, activeFormId);
            console.log(`Successfully generated PDF for: ${activeFormId}`);
        } catch (error) {
            console.error('PDF Generation failed:', error);
        }
    });
}
