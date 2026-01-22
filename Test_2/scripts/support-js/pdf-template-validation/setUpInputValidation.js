export function setupInputValidation() {
    // Select both inputs using a comma-separated list of IDs
    const numericInputs = document.querySelectorAll("#pdfTemplate-ordernumber, #pdfTemplate-totaldue");

    numericInputs.forEach(input => {
        input.addEventListener("input", (e) => {
            const value = e.target.value;
            
            // Dynamically find the correct error message based on the input's ID
            // Example: if id is 'pdfTemplate-ordernumber', it looks for 'pdfTemplate-error-ordernumber'
            const fieldName = e.target.id.replace("pdfTemplate-", "");
            const errorMsg = document.getElementById(`pdfTemplate-error-${fieldName}`);

            if (/\D/.test(value)) {
                if (errorMsg) errorMsg.style.display = "block";
                
                // Remove non-numeric characters
                e.target.value = value.replace(/\D/g, "");
            } else {
                // Hide error message if the value is now valid
                if (errorMsg) errorMsg.style.display = "none";
            }
        });
    });
}
