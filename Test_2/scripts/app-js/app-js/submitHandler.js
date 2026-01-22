import { generatePDF } from "../../support-js/generatePDF/generatePDF.js";
import { updateAlfrescoMetadata } from "./updateAlfrescoMetadata.js";
export async function submitHandler() {
    // We grab whatever form is currently injected in the DOM
    const formElement = document.querySelector('#form-content-area form');

    if (!formElement) {
        console.error("No form found to attach submit listener.");
        return;
    }

    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Dynamically get the ID
        const activeFormId = event.target.id;
        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());


        // 2. Generate PDF
        const pdfBlob = await generatePDF(formObject, activeFormId);

        // 3. Prepare Upload Data
        const uploadData = new FormData();
        const uniqueName = `${activeFormId}.pdf`;
        const nodeID = "171d611c-3229-4c81-9a8a-6570602f4923";

        uploadData.append("name", uniqueName);
        uploadData.append("filedata", pdfBlob, uniqueName);
        uploadData.append("nodeType", "cm:content");
        uploadData.append("overwrite", "true");

        // 4. AJAX Upload
        await new Promise((resolve, reject) => {
            $.ajax({
                url: `https://ecm-dev.dsnyad.nycnet/alfresco/api/-default-/public/alfresco/versions/1/nodes/${nodeID}/children?alf_ticket=${ticket}`,
                type: "POST",
                headers: {
                    "Accept": "application/json",
                    "Cache-Control": "no-cache"
                },
                data: uploadData,
                processData: false,
                contentType: false,
                success: function (response) {
                    console.log("PDF uploaded successfully:", response);
                    console.log(`Successfully generated and stored PDF for: ${activeFormId}`);
                    resolve(response); // Notifies 'await' that the request is finished
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
        // FIX THIS ERROR. IT HAS SOME WEIRD ERR_NAME_NOT_RESOLVED ERROR.
        // CHECK THE URL. IT MAY BE WRONG OR SOMETHING.
        await updateAlfrescoMetadata(formObject, nodeID);
    });
}

