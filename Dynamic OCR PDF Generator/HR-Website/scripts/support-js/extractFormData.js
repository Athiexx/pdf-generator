export async function extractFormData(formElement) {
    // select the form
    const formData = new FormData(formElement);

    // create an object to hold the form data
    const formObject = Object.fromEntries(formData.entries());

    console.log("Successfully extracted form data.");
    console.log("FormData Object:", formData);
    console.log("Form Object:", formObject);
    
    return formObject;
}