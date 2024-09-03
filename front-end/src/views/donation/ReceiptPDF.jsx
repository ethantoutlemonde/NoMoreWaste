import React, { useEffect } from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const ReceiptPDF = ({ amount, onClose }) => {
  useEffect(() => {
    generatePDF();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Receipt Amount: $${amount}`, 10, 10);
    doc.save("receipt.pdf");
  };

  return (
    <div>
      <h1>Receipt</h1>
      <p>Amount: ${amount}</p>
    </div>
  );
};

export default ReceiptPDF;
