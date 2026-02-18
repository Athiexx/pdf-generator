export async function updateAlfrescoMetadata(formObject, uploadedNodeId) {
    
    const updateData = {
        "properties": {
            "cm:title": formObject['pdfTemplate-companyname'],
            "cm:description": formObject['pdfTemplate-itemdescription'],
            "dsnyCPModel:CPNumber": formObject['pdfTemplate-ordernumber'],
            "dsnyCPModel:CPDollarAmt": formObject['pdfTemplate-totaldue']
        }
    };
    
    // Return the promise so the caller can 'await' it
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://ecm-dev.dsnyad.nycnet/alfresco/api/-default-/public/alfresco/versions/1/nodes/${uploadedNodeId}?alf_ticket=${ticket}`,
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(updateData),
            success: function(response) {
                console.log("Successfully updated metadata:", response.entry);
                resolve(response); // Signal completion
            },
            error: function(xhr) {
                console.error("Updated failed:", xhr.status, xhr.responseText);
                reject(xhr); // Signal failure
            }
        });
    });
}
