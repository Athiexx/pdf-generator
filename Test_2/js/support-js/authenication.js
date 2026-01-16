// this is for retrieving an authentication ticket from Alfresco using v1 REST API

const $ = window.jQuery;

export async function authenticate(){
    const existingTicket = sessionStorage.getItem("alfrescoTicket");
    if(existingTicket){
        console.log("Using existing authentication ticket:", existingTicket);
        return existingTicket; // already have a ticket
    }
    const authData = {
        "userId":  "admin",
        "password": "rep0master"
    }

    $.ajax({
        url: "https://ecm-dev.dsnyad.nycnet/alfresco/api/-default-/public/authentication/versions/1/tickets",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(authData),
        success: function(response) {
            const ticket = response.entry.id;
            console.log("Authentication ticket:", ticket);
            // store it as a session so we can authenticate next time
            sessionStorage.setItem("alfrescoTicket", ticket);
            console.log("New ticket stored retrieved and stored in sessionStorage.");
        },
        // xhr contains the actual response from the server
        error: function(xhr, status, error) {
            console.error("Error status:", status);
            console.error("Error code:", xhr.status);
            console.error("Authentication failed:", error);
            console.error("Response:", xhr.responseText);
            console.error("Server Headers:", xhr.getAllResponseHeaders());
        }
    });

    return ticket;
}