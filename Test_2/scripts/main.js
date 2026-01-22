import * as AppJS from './app-js/index.js';


export function init() {
    const formContainer = document.getElementById('select-form-container');

    // Change to async so we can wait for the form to exist
    formContainer.addEventListener('change', async (event) => {
        let formPath = event.target.name;
        if (formPath === 'formchoice') {
            let formPathTarget = event.target.value;
            try {
                // Display the form
                await AppJS.displayForm(formPathTarget); 
                // show submit button after form is displayed
                AppJS.displayButton();
                
                // Submit form logic
                AppJS.submitHandler();
            } catch (error) {
                console.error("Form switch failed:", error);
            }
        }
    });
}
