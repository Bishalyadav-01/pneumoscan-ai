"use client";

import jsPDF from "jspdf";


type Props = {
  prediction: string;
  probability: number;
};

export default function PDFButton({
  prediction,
  probability
}: Props) {

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text("PneumoScan AI Report", 20, 30);

    doc.setFontSize(16);

    doc.text(
      `Prediction: ${prediction}`,
      20,
      60
    );

    doc.text(
      `Probability: ${(probability * 100).toFixed(2)}%`,
      20,
      80
    );

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      20,
      100
    );

    doc.save("pneumoscan-report.pdf");
  };

  return (

    <button
      onClick={downloadPDF}
      className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-bold"
    >
      Download PDF Report
    </button>
  );
}