import { populateFiscalYears } from "./support-js/append_fiscalyear.js";
import { setupUAValidation } from "./support-js/validation.js";
import { setupDollarAmountValidation } from "./support-js/validation.js";
import { setupEmployeeIdValidation } from "./support-js/validation.js";

// display_form.js - Dynamically loads form snippets via Fetch API
export async function displayForm(selectedForm) {
    const mainContainer = document.getElementById('form-display-container');
    const header = mainContainer?.querySelector('h2');
    const contentArea = document.getElementById('form-content-area');
    const iframe = document.getElementById('pdf-iframe');

    if (!contentArea) return;

    // CLEAR THE CONTAINER
    // Ensures no old forms are there

    contentArea.replaceChildren();

    // clear and hide the i-frame again if a user already submitted a form
    if (iframe) {
        // Clean up memory if a blob exists
        if (iframe.src.startsWith('blob:')) {
            URL.revokeObjectURL(iframe.src);
        }
        // Remove the source and hide the element
        iframe.src = "";
        iframe.classList.add('is-hidden');
    }

    // 1. Map selection to file paths. These files contain the employee and cp document forms
    const formPaths = {
        'CP Document': 'forms/cp-document-form.html',
        'Employee Information': 'forms/employee-info-form.html'
    };

    const targetPath = formPaths[selectedForm];

    if (targetPath && contentArea) {
        try {
            // 2. Fetch the external HTML snippet
            const response = await fetch(targetPath);
            // Throw an error if there's an issue with retrieving the form path
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            // 3. Convert response to a string
            const htmlContent = await response.text();

            // 4. Update the UI dynamically
            if (header) header.textContent = `${selectedForm} Form:`;

            // Inject the string into your placeholder div
            contentArea.innerHTML = htmlContent;

            if (selectedForm === 'CP Document') {
                populateFiscalYears();
                setupUAValidation();
                setupDollarAmountValidation();
            }

            if (selectedForm === 'Employee Information') {
                setupEmployeeIdValidation();
            }

            // 5. Remove 'is-hidden' from the newly injected form and focus
            const activeForm = contentArea.querySelector('form');
            if (activeForm) {
                activeForm.classList.remove('is-hidden');
                activeForm.querySelector('input, select, textarea')?.focus();
            }

            console.log("Showing form from:", targetPath);

        } catch (error) {
            console.error("Failed to load the form:", error);
            contentArea.innerHTML = `<p style="color:red;">Error loading ${selectedForm}. Please try again.</p>`;
        }
    }
}