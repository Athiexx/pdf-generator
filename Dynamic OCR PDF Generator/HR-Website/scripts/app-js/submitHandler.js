//import { displayPDF } from "../support-js/displayPDF";
import { extractFormData } from "../support-js/extractFormData.js";
import { generatePDF } from "../support-js/generatePDF.js";

export async function submitHandler() {
    const formElement = document.getElementById("ds46-form");
    let pdfData = new FormData();

    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        // retrieve PDFdata from the form and then pass it onto the generate PDF function
        pdfData = await extractFormData(formElement);
        console.log("Extracted PDF Data:", pdfData);

        // Generate and display the PDF in the iframe
        const pdfBlob = await generatePDF(pdfData);

        const uploadData = new FormData();
        const uniqueName = `HR-Website-Test-PDF-${Date.now()}.pdf`;
        uploadData.append("name", uniqueName);
        uploadData.append("filedata", pdfBlob, uniqueName);
        uploadData.append("nodeType", "cm:content");
        uploadData.append("overwrite", "true");
        
        // ** THIS IS CRUCIAL FOR LINKING THE PDF TO THE FORM DATA IN THE XML MODEL. **
        // Upload Node ID will be used later when we create an XMl model.
        // This Node ID will be used to update the metadata of the file we just uploaded, so we can link it to the form data.
        return new Promise((resolve, reject) => {
            $.ajax({
                    url: "https://ecm-dev.dsnyad.nycnet/alfresco/api/-default-/public/alfresco/versions/1/nodes/cfa1a16e-cd4b-4d6a-9dfc-ed43887e5f4c/children?alf_ticket=" + window.ticket,
                    type: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Cache-Control": "no-cache"
                    },
                    data: uploadData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        console.log("PDF uploaded successfully to Alfresco:", response);
                        // extracting the new id from the file we just uploaded
                        const newNodeId = response.entry.id;
                        resolve(newNodeId); // Notifies 'await' that the request is finished
                    },
                    error: function (xhr, status, error) {
                        console.error("Upload to Alfresco failed:", error);
                        console.error("Response:", xhr.responseText);
                        console.error("Error status:", status);
                        console.error("Error code:", xhr.status);
                        console.error("Server Headers:", xhr.getAllResponseHeaders());
                        reject(xhr); // Notifies 'await' that the request failed
                    }
                });
        });
    });
}