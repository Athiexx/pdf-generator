export function setupEmployeeIdValidation() {
    const employeeidInput = document.getElementById("employeeInfo-ID");
    const errorMsg = document.getElementById("employeeInfo-id-error");

    if (employeeidInput) {
        employeeidInput.addEventListener("input", (e) => {
            // Replace anything that isn't a number

            const originalValue = e.target.value;

            // check to see if any non-numeric character exists first
            // if it does, display the error message
            // if not, hide the error message
            if (/\D/.test(originalValue)) {
                errorMsg.style.display = "block";
                console.log("Error message displayed successfully");
            }
            else {
                errorMsg.style.display = "none";
                console.log("Error message hidden successfully");
            }

            // clear the non numeric string (remove non-digits and limit to 7)
            try {
                e.target.value = e.target.value.replace(/\D/g, "");
                console.log("Successfully replaced non-numeric values.")
            }
            catch (error) {
                console.error("Error: Could not replace non-numeric values", error);
            }
        });
    }
}