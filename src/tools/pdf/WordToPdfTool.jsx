import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Upload, FileCheck, Download } from 'lucide-react';

export default function WordToPdfTool() {
  const [docTitle, setDocTitle] = useState('Document');
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const convertToPdf = async () => {
    if (!text.trim()) {
      alert('Please enter or paste document text to generate PDF.');
      return;
    }
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      page.drawText(docTitle, {
        x: 50,
        y: 740,
        size: 20,
        font: helveticaFont,
        color: rgb(0.01, 0.52, 0.78),
      });

      const lines = text.split('\n');
      let currentY = 700;

      lines.forEach(line => {
        if (currentY > 50) {
          page.drawText(line.substring(0, 80), {
            x: 50,
            y: currentY,
            size: 12,
            font: helveticaFont,
            color: rgb(0.1, 0.1, 0.1),
          });
          currentY -= 20;
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${docTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error creating PDF: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="tool-workspace">
      <div className="form-group">
        <label>Document Title:</label>
        <input
          type="text"
          className="form-control"
          value={docTitle}
          onChange={(e) => setDocTitle(e.target.value)}
          placeholder="e.g. Project Proposal"
        />
      </div>

      <div className="form-group" style={{ marginTop: '1rem' }}>
        <label>Paste Document Content / Text:</label>
        <textarea
          className="form-control"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text content here to export as PDF..."
        />
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="btn-primary" onClick={convertToPdf} disabled={isProcessing || !text.trim()}>
          <FileCheck size={18} />
          {isProcessing ? 'Generating PDF...' : 'Convert to PDF & Download'}
        </button>
      </div>
    </div>
  );
}
