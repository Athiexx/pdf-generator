import { PDFDocument, StandardFonts } from 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.esm.min.js';
import { drawPDF } from './drawPDF.js';

export async function generatePDF(formObject, formId) {
    let pdfDoc;
    let page;

    // 2. Map Data Based on Form ID
    // Call "drawPDF" function whden the form is either CP or Employee
    if (formId === 'cpDocument-form-display-container' || formId === 'employeeInfo-form-display-container') {
        pdfDoc = await PDFDocument.create();
        page = pdfDoc.addPage();

        let headerText = "";
        let fields = [];

        const fonts = {
            regular: await pdfDoc.embedFont(StandardFonts.TimesRoman),
            bold: await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
        };

        if (formId === 'cpDocument-form-display-container') {
            headerText = "Capital Budget CP Document";
            fields = [
                ["CP Number", formObject['cpDocument-cpNumber']],
                ["Dollar Amount", `$${formObject['cpDocument-cpDollarAmount']}`],
                ["Fiscal Year", formObject['cpDocument-fiscalYear']],
                ["CP Requested Date", formObject['cpDocument-RequestedDate']],
                ["CP Approval Date", formObject['cpDocument-ApprovalDate']],
                ["Fund", formObject['cpDocument-fund']],
                ["Department Code", formObject['cpDocument-departmentCode']],
                ["UA Code", formObject['cpDocument-UA']],
                ["Budget Code", formObject['cpDocument-budgetCode']],
                ["Object Code", formObject['cpDocument-objectCode']],
                ["Supersede CP By", formObject['cpDocument-supersedeCPBy']],
                ["Supersede CP Date", formObject['cpDocument-supersedeCPDate']]
            ];
        } else {
            headerText = "Employee Information Form";
            fields = [
                ["First Name", formObject['employeeInfo-firstname']],
                ["Last Name", formObject['employeeInfo-lastname']],
                ["Employee ID", formObject['employeeInfo-ID']],
                ["Email", formObject['employeeInfo-email']],
                ["Bureau", formObject['employeeInfo-bureau']],
                ["Position", formObject['employeeInfo-position']],
                ["Location", formObject['employeeInfo-location']]

            ];

        }
        drawPDF(page, fields, headerText, fonts);

    } else if (formID === 'pdfTemplate-form-container') {
        const templateUrl = '../../forms/Simple_Order_Form_Template.pdf';
        const templateBytes = await fetch(templateUrl).then(res => arrayBuffer());

        pdfDoc = await PDFDocument.load(templateBytes);
        const form = pdfDoc.getForm();

        const fonts = await pdfDoc.embedFont(StandardFonts.TimesRoman);

        form.getTextField("Company Name").setText(formObject['pdfTemplate-companyname'] || '');
        form.getTextField("Order Number").setText(formObject['pdfTemplate-ordernumber'] || '');
        form.getTextField("Order Date").setText(formObject['pdfTemplate-orderdate'] || '');
        form.getTextField("Total Due").setText(formObject['pdfTemplate-totaldue'] || '');
        form.getTextField("Item Description").setText(formObject['pdfTemplate-itemdescription'] || '');

        // make surre the font size is set to 12
        const textFields = form.getFields().filter(f => f.constructor.name === 'PDFTextField');
        textFields.forEach(field => {
            field.setFontSize(12); // Sets a uniform font size for all text fields
        });

        // update the fonts
        form.updateFieldAppearances(fonts);
    }


    // 5. Generate Blob and Update Iframe
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    const iframe = document.getElementById('pdf-iframe');

    if (iframe) {
        // Clean up memory if a previous PDF exists
        if (iframe.src.startsWith('blob:')) {
            URL.revokeObjectURL(iframe.src);
        }
        iframe.src = blobUrl;
        if (iframe.classList.contains('is-hidden')) {
            iframe.classList.remove('is-hidden');
        }
        console.log('PDF rendered to iframe successfully.');
    } else {
        // Fallback if iframe is missing
        window.open(blobUrl, '_blank');
        console.warn('Iframe not found; opened PDF in new tab.');
    }

    // return the blob so submit_handler.js is able to retrieve it and upload it to Alfresco
    return blob;
}
