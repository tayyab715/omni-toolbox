import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, FileText, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export default function MergePdfTool() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index, direction) => {
    const newFiles = [...files];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= newFiles.length) return;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIdx];
    newFiles[targetIdx] = temp;
    setFiles(newFiles);
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      alert('Please upload at least 2 PDF files to merge.');
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `merged-document-${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Error merging PDFs: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="tool-workspace">
      <label className="dropzone">
        <input type="file" multiple accept="application/pdf" onChange={handleFileChange} style={{ display: 'none' }} />
        <Upload size={44} className="dropzone-icon" />
        <h3>Click or Drag & Drop PDF files here</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Select multiple PDFs to combine into a single file
        </p>
      </label>

      {files.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Selected PDF Files ({files.length}):</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            {files.map((file, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-tertiary)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileText size={20} color="var(--accent-primary)" />
                  <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{file.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button className="btn-secondary" onClick={() => moveFile(idx, -1)} disabled={idx === 0}>
                    <ArrowUp size={16} />
                  </button>
                  <button className="btn-secondary" onClick={() => moveFile(idx, 1)} disabled={idx === files.length - 1}>
                    <ArrowDown size={16} />
                  </button>
                  <button className="btn-secondary" onClick={() => removeFile(idx)} style={{ color: 'var(--danger)' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn-primary" onClick={mergePdfs} disabled={isProcessing || files.length < 2}>
              <Download size={18} />
              {isProcessing ? 'Merging PDFs...' : 'Merge PDFs Now'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
