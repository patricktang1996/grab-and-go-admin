// import jsPdf from 'jspdf';

function generatePDF() {

    let pdfDiv = document.getElementById("pdfDiv");
    let options = {
        margin:1, 
        filename: "test.pdf",
        image: {type: "svg", quality: 0.95},
        html2canvas: { scale: 3 },
        jsPDFL: { unit: "mm", format: "A4", orientation: "portrait", autoAddFonts: true}
    };
    console.log("saving pdf");
    html2pdf(pdfDiv, options);
}

document.getElementById("savePdf")?.addEventListener("click", function() { generatePDF() });
console.log("js loaded");