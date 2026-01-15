import { displayButton } from './display_button.js';
import { displayForm } from './display_form.js';
import { submit_handler } from './submit_handler.js';

export function init() {
    const formContainer = document.getElementById('select-form-container');

    // Change to async so we can wait for the form to exist
    formContainer.addEventListener('change', async (event) => {
        let formPath = event.target.name;
        if (formPath === 'formchoice') {
            let formPathTarget = event.target.value;
            try {
                // ADD AWAIT HERE
                await displayForm(formPathTarget); 
                
                displayButton();
                
                // Now the form is definitely in the DOM, so we can attach the handler
                submit_handler();
            } catch (error) {
                console.error("Form switch failed:", error);
            }
        }
    });
}
