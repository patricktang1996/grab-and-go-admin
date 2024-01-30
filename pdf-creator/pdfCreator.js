// import jsPdf from 'jspdf';

function generatePDF() {

    let pdfDiv = document.getElementById("pdfDiv");

    let options = {
        margin:1, 
        filename: "test.pdf",
        image: {type: "vector", quality: 0.98},
        html2canvas: { scale: 2 },
        jsPDFL: { unit: "mm", format: "a4", orientation: "portrait"}
    };
    console.log("saving pdf");
    html2pdf(pdfDiv, options);
}

document.getElementById("savePdf")?.addEventListener("click", function() { generatePDF() });
console.log("js loaded");