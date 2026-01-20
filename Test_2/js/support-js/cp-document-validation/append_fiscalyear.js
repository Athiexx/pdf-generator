// Append fiscal years depending on user
export function populateFiscalYears() {
    const selectFiscalYear = document.getElementById("cpDocument-fiscalYear");
    if(!selectFiscalYear) return; // Exit if the element does not exist yet
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0 = Jan, 5 = June

    /** 
     * FISCAL YEAR LOGIC:
     * If today is June 30 (Month 5) or earlier, the "current" FY is the calendar year.
     * If today is July 1 (Month 6) or later, we have entered the next FY.
     */
    let latestFY = currentYear;

    if (currentMonth > 5) {
        // If it is July or later: The "active" fiscal year is next year
        latestFY = currentYear + 1;
    } else {
        // If it is June 30 or earlier: The "active" fiscal year is this year
        latestFY = currentYear;
    }

    let optionsHTML = '<option value="N/a">N/A</option>';

    // Loop to get the past 10 fiscal years
    for (let i = 0; i <= 10; i++) {
        let fyValue = latestFY - i;
        optionsHTML += `<option value="${fyValue}">${fyValue}</option>`;
    }

    selectFiscalYear.innerHTML = optionsHTML;
}
