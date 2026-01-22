import * as populateFiscalYear from "./cp-document-validation/populateFiscalYear.js";
import * as setupDollarAmountValidation from "./cp-document-validation/setupDollarAmountValidation.js";
import * as setupUAValidation from "./cp-document-validation/setupUAValidation.js";

export const CPDocValidation = {populateFiscalYear, setupDollarAmountValidation, setupUAValidation};

export * as generatePDF from "./generatePDF/generatePDF.js";
export * as EmployeeInfoDocValidation from "./employee-info-validation/setupEmployeeIdValidation.js";
export * as PDFTemplateValidation from "./pdf-template-validation/setUpInputValidation.js";