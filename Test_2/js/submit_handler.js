import { generatePDF } from "./support-js/pdf_generator.js";
import { authenticate } from "./support-js/authenication.js";

export async function submit_handler() {
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

        try {
            // 1. Authenticate and get ticket
            const ticket = await authenticate();

            if (!ticket) {
                // If throw is called, execution jumps to the catch block
                document.getElementById("error-form-output-container").innerHTML = "<p style='color: red;'>Cannot retrieve ticket. Will not generate form. Please try again later.</p>";
                console.error("Authentication ticket is missing. Cannot proceed.");
                return;
            }

            // 2. Generate PDF
            const pdfBlob = await generatePDF(formObject, activeFormId);

            // 3. Prepare Upload Data
            const uploadData = new FormData();
            const uniqueName = `${activeFormId}_${new Date().getTime()}.pdf`;

            uploadData.append("name", uniqueName);
            uploadData.append("filedata", pdfBlob, uniqueName);
            uploadData.append("nodeType", "cm:content");
            uploadData.append("overwrite", "true");

            // 4. AJAX Upload
            $.ajax({
                url: "https://ecm-dev.dsnyad.nycnet/alfresco/api/-default-/public/alfresco/versions/1/nodes/171d611c-3229-4c81-9a8a-6570602f4923/children",
                type: "POST",
                headers: {
                    "Authorization": "Basic " + btoa(ticket + ":"),
                    "Accept": "application/json",
                    "Cache-Control": "no-cache"
                },
                data: uploadData,
                processData: false,
                contentType: false,
                success: function(response) {
                    console.log("PDF uploaded successfully:", response);
                    console.log(`Successfully generated and stored PDF for: ${activeFormId}`);
                },
                error: function(xhr, status, error) {
                    console.error("Upload to Alfresco failed:", error);
                    console.error("Response:", xhr.responseText);
                    console.error("Error status:", status);
                    console.error("Error code:", xhr.status);
                    console.error("Server Headers:", xhr.getAllResponseHeaders());
                }
            });

        } catch (error) {
            console.error("Process failed:", error.message);
        }
    });
}


