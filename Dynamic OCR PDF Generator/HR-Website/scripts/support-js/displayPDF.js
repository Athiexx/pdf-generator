export async function displayPDF(pdfData) {



    
  const iframe = document.getElementById("pdf-iframe");
  const blob = new Blob([pdfData], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  iframe.src = url;
  iframe.classList.remove("is-hidden");
}