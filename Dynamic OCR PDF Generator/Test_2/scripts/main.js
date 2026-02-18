import * as AppJS from './app-js/index.js';


export async function init() {
    // Authenticate immediately first
    try {
        console.log("App initializing: Authenticating...");
        await window.authenticate();
        console.log("Authentication successful. Ready for user input.");
    
    } catch (authError) {
        console.error("Critical Failure: Could not authenticate user.", authError);
        // Optional: Show an error message to the user on the screen
        return;
    }
    const formContainer = document.getElementById('select-form-container');
    if (!formContainer) {
        console.log("No formcontainer. ID ", formContainer, " is missing.");
        console.log("NEED:'select-form-container");
        return;
    }


    // Change to async so we can wait for the form to exist
    formContainer.addEventListener('change', async (event) => {
        if (event.target.name === 'formchoice') {
            const formPathTarget = event.target.value;
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
