// display button JS code

export function displayButton() {
    const buttonContentContainer = document.getElementById('submit-button-content-area');
    
    // Find the current form's ID dynamically
    const activeForm = document.querySelector('#form-content-area form');
    const activeFormId = activeForm ? activeForm.id : "";

    // IMPORTANT: Add form='ID' so this button triggers that specific form
    const buttonContent = `<button id='submit-button' type='submit' form='${activeFormId}'>Submit</button>`;
    
    buttonContentContainer.innerHTML = buttonContent;
    document.getElementById('submit-button-display-container').classList.remove('is-hidden');
}