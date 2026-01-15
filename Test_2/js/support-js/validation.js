// UA is also a field where it accepts numeric values only
export function setupUAValidation() {
    const uaInput = document.getElementById("cpDocument-UA");
    const errorMsg = document.getElementById("cpDocument-id-error-UA");

    if (uaInput) {
        uaInput.addEventListener("input", (e) => {
            // Replace any character that is NOT a digit (0-9) with an empty string\
            const originalValue = e.target.value;
            if (/\D/.test(originalValue)) {
                errorMsg.style.display = "block";
                try {
                    e.target.value = e.target.value.replace(/\D/g, "");
                    console.log("Successfully replaced non-numeric values");

                }
                catch (error) {
                    console.error("Error: Could not replace non-numeric values.", error);
                }

            }
        });
    }
}

export function setupDollarAmountValidation() {
    const amountInput = document.getElementById("cpDocument-cpDollarAmount");
    const errorMsg = document.getElementById("cpDocument-id-error-dollarAmount");

    if (amountInput) {
        // --- REAL-TIME VALIDATION ---
        amountInput.addEventListener("input", (e) => {
            let val = e.target.value;

            // 1. Show error for non-numeric or leading zeros
            if (/[^0-9.]/.test(val) || val.startsWith("0")) {
                errorMsg.textContent = "Please enter a number starting with 1-9.";
                errorMsg.style.display = "block";
                console.log("Error message displayed successfully");
            } else {
                errorMsg.style.display = "none";
                console.log("Error message hidden successfully");
            }

            // 2. Immediate cleaning:
            // Remove non-numeric/non-dot characters
            val = val.replace(/[^0-9.]/g, "");
            // Collapse multiple dots (e.g., "10..5" -> "10.5")
            val = val.replace(/\.{2,}/g, ".");
            // Strip any leading zeros
            val = val.replace(/^0+/, "");

            // 3. Limit to exactly 2 decimal places
            const parts = val.split('.');
            try {
                if (parts.length > 1) {
                    const dollars = parts[0];
                    const cents = parts[1].substring(0, 2);
                    val = `${dollars}.${cents}`;
                    console.log("Successfully limited field to one decimal place");
                }
            }
            catch (error) {
                console.error("Error: More than one decimal", error);
            }

            e.target.value = val;
        });

        // --- BLUR (ON LEAVE) FORMATTING ---
        amountInput.addEventListener("blur", (e) => {
            let val = e.target.value;

            // If the field is empty, do nothing
            if (!val) return;

            // If it's just a decimal point, clear it
            if (val === ".") {
                e.target.value = "";
                return;
            }

            // Use the parseFloat/toFixed approach to ensure exactly .00 suffix
            const numericValue = parseFloat(val);

            // CORRECTED: Check the number variable and call toFixed on it
            try {
                if (!isNaN(numericValue)) {
                    e.target.value = numericValue.toFixed(2); // This dynamically updates the screen on leave
                    console.log("Successfully added '.00' to CP Dollar Amount input field");
                }
            }
            catch (error) {
                console.error("Error: Could not add '.00' to CP Dollar Amount input field'", error);
            }
        });
    }
}


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


