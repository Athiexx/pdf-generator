import { authenticate } from "./app.js/authenticate.js";

export async function init() {
    // Authenticate immediately first
    try {
        console.log("App initializing: Authenticating...");
        await authenticate();
        console.log("Authentication successful.");}
    catch (authError) {
        console.error("Critical Failure: Could not retrieve authentication.", authError);
    }
}