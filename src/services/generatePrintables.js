import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { toJpeg } from "html-to-image";

export async function generateReceipt() {
  const receiptElement = document.getElementById("pdf-receipt");

  // Temporarily make the content visible for html2canvas
  receiptElement.style.display = "block";

  const canvas = await html2canvas(receiptElement);

  // Hide the content again after the snapshot is taken
  receiptElement.style.display = "none";

  const imgData = canvas.toDataURL("image/jpeg", 1.0); // using JPEG format (max quality)

  // Define custom PDF size
  const pdfWidth = 105; // width in mm (A4 size)
  const pdfHeight = 150; // height in mm (A4 size)

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [pdfWidth, pdfHeight],
  });

  // Calculate scaling factors for zoom out effect
  const zoomFactor = 1; // Adjust this value to zoom in or out
  const imageWidth = ((canvas.width * 25.4) / 96) * zoomFactor; // Convert pixels to mm and apply zoom factor
  const imageHeight = ((canvas.height * 25.4) / 96) * zoomFactor; // Convert pixels to mm and apply zoom factor

  // Calculate x and y offsets to center the image on the page
  const offsetX = (pdfWidth - imageWidth) / 2;
  const offsetY = (pdfHeight - imageHeight) / 2;

  pdf.addImage(imgData, "JPEG", offsetX, offsetY, imageWidth, imageHeight);

  return pdf.output("blob");
}

export async function generateBarcode(barcodeRef) {
  const node = document.createElement("div");
  node.style.display = "flex";
  node.style.justifyContent = "center";
  node.style.alignItems = "center";
  node.style.backgroundColor = "white";
  node.appendChild(barcodeRef.current.cloneNode(true));

  const dataUrl = await toJpeg(node, {
    quality: 0.95,
    width: 280,
    height: 160,
  });

  const link = document.createElement("a");
  link.download = "barcode.jpeg";
  link.href = dataUrl;
  link.click();
}

export async function generateLabel(labelRef) {
  const node = document.createElement("div");
  node.style.display = "flex";
  node.style.justifyContent = "center";
  node.style.alignItems = "center";
  node.style.backgroundColor = "white";
  node.appendChild(labelRef.current.cloneNode(true));

  const dataUrl = await toJpeg(node, {
    quality: 0.95,
    width: 100,
    height: 100,
  });

  const link = document.createElement("a");
  link.download = "label.jpeg";
  link.href = dataUrl;
  link.click();
}
