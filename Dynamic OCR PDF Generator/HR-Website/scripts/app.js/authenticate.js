import "../jquery/jquery-3.7.1.min.js"; 

// Create a local reference (alias) to the globally available jQuery object/function
const $ = window.jQuery; 

window.ticket = "";

export async function authenticate() {
    return new Promise((resolve, reject) => {
        const uploadUrl = "https://ecm-dev.dsnyad.nycnet/alfresco/api/-default-/public/authentication/versions/1/tickets";
        const existingTicket = sessionStorage.getItem("alfrescoTicket");

        if (existingTicket) {
            window.ticket = existingTicket;
            console.log("Ticket:", window.ticket);
            console.log("Using existing ticket from session.");
            return resolve(existingTicket);
        }
        // user id and password to be authenticated 
        const authData = {
            "userId": "admin",
            "password": "rep0master"
        };

        // using jquery to authenticate + upload the thing to alfresco
        $.ajax({
            url: uploadUrl,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(authData),
            success: function (response) {
                // Accessing the specific Alfresco V1 response path
                window.ticket = response.entry.id;
                sessionStorage.setItem("alfrescoTicket", window.ticket);
                console.log("Ticket:", window.ticket);
                resolve(window.ticket);
            },
            error: function (xhr) {
                console.error("Error status from server:", xhr.status);
                console.error("Status text:", xhr.statusText)
                console.error("Auth failed:", xhr.responseText);
                console.error("XHR Object:", xhr);
                reject(xhr);
            }
        });
    });
};

