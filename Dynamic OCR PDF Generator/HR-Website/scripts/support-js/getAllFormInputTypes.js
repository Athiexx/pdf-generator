export async function getAllFormInputTypes() {
    // get all input elements from the form
    const inputs = document.querySelectorAll('input');
    // create an object to hold the input types and names associated with them
    const inputTypes = new Object();


    inputs.forEach(element => {
        // get input's type. Type can be either two values: "name"
        let type = element.type;

        // the name of the input will be the same as the corresponding field in the PDF form
        let name = element.name;

        // Retrieve the id, as the radio buttons have the same inputy name and type.
        //  The id will be used to differentiate between different radio button options
        let value = element.value;

        inputTypes[name] = { type, value };
    });

    return inputTypes;


}