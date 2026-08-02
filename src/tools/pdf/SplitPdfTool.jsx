import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, Scissors, FileText } from 'lucide-react';

export default function SplitPdfTool() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageRange, setPageRange] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || selectedFile.type !== 'application/pdf') return;

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      setFile(selectedFile);
      setTotalPages(pdf.getPageCount());
      setPageRange(`1-${pdf.getPageCount()}`);
    } catch (err) {
      alert('Failed to read PDF file: ' + err.message);
    }
  };

  const parseRanges = (str, total) => {
    const pages = new Set();
    const parts = str.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(Number);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.max(1, start); i <= Math.min(total, end); i++) {
            pages.add(i - 1); // 0-indexed
          }
        }
      } else {
        const p = Number(trimmed);
        if (!isNaN(p) && p >= 1 && p <= total) {
          pages.add(p - 1);
        }
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  const splitPdf = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(buffer);
      const targetPages = parseRanges(pageRange, totalPages);

      if (targetPages.length === 0) {
        alert('Please enter a valid page range.');
        setIsProcessing(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(srcPdf, targetPages);
      copiedPages.forEach(p => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `extracted-pages-${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error splitting PDF: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="tool-workspace">
      {!file ? (
        <label className="dropzone">
          <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ display: 'none' }} />
          <Upload size={44} className="dropzone-icon" />
          <h3>Click or Drag & Drop PDF file to Split</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Extract specific pages or page ranges easily
          </p>
        </label>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <FileText size={32} color="var(--accent-primary)" />
            <div>
              <h4 style={{ margin: 0 }}>{file.name}</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Total Pages: <strong>{totalPages}</strong>
              </p>
            </div>
            <button className="btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => setFile(null)}>
              Change File
            </button>
          </div>

          <div style={{ marginTop: '1.5rem' }} className="form-group">
            <label>Pages to Extract (e.g. 1-3, 5, 7-10):</label>
            <input
              type="text"
              className="form-control"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              placeholder="e.g. 1-3, 5"
            />
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn-primary" onClick={splitPdf} disabled={isProcessing}>
              <Scissors size={18} />
              {isProcessing ? 'Extracting Pages...' : 'Extract & Download PDF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
