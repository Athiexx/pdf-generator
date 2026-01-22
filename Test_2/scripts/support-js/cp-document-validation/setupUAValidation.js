export function setupUAValidation() {
    const uaInput = document.getElementById("cpDocument-UA");
    const errorMsg = document.getElementById("cpDocument-error-UA");

    if (uaInput) {
        uaInput.addEventListener("input", (e) => {
            // Replace any character that is NOT a digit (0-9) with an empty string\
            const originalValue = e.target.value;
            if (/\D/.test(originalValue)) {
                errorMsg.style.display = "block";

                // replace the user's input to be empty if it's not a numeric value
                e.target.value = e.target.value.replace(/\D/g, "");

            }
        });
    }
}