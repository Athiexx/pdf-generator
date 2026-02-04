import {init} from './scripts/main.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        init();
    }
    catch (error) {
        console.log("HTML content did not load.")
        console.log("Initialization error. Init function did not complete.")
        console.error(error);
    }
    
});