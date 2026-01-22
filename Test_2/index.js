import { init } from './scripts/main.js';

// This starts the code once the HTML is loaded
document.addEventListener('DOMContentLoaded', () => {
    try{
    init();
    console.log("HTML content loaded successfully")}
    catch(error){
        console.log("HTML content did not load")
        console.error(error);
    }
});