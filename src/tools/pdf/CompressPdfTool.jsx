import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Minimize2, Download, FileText } from 'lucide-react';

export default function CompressPdfTool() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(60);
  const [isProcessing, setIsProcessing] = useState(false);
  const [origSize, setOrigSize] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setOrigSize(selectedFile.size);
    }
  };

  const compressPdf = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      
      // Save PDF with objects stream optimization
      const compressedBytes = await pdfDoc.save({ useObjectStreams: true });
      const blob = new Blob([compressedBytes], { type: 'application/pdf' });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `compressed-${file.name}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error compressing PDF: ' + err.message);
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
          <h3>Click or Drag & Drop PDF to Compress</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Reduce file size for email attachments and fast downloads
          </p>
        </label>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <FileText size={32} color="var(--accent-primary)" />
            <div>
              <h4 style={{ margin: 0 }}>{file.name}</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Original Size: <strong>{(origSize / (1024 * 1024)).toFixed(2)} MB</strong>
              </p>
            </div>
            <button className="btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => setFile(null)}>
              Change File
            </button>
          </div>

          <div style={{ marginTop: '1.5rem' }} className="form-group">
            <label>Compression Optimization Level ({quality}%):</label>
            <input
              type="range"
              min="20"
              max="90"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn-primary" onClick={compressPdf} disabled={isProcessing}>
              <Minimize2 size={18} />
              {isProcessing ? 'Compressing PDF...' : 'Compress PDF & Download'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
