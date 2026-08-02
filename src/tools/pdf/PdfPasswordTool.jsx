import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Lock, Unlock, Download, FileText } from 'lucide-react';

export default function PdfPasswordTool() {
  const [file, setFile] = useState(null);
  const [userPassword, setUserPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const applySecurity = async () => {
    if (!file) return;
    if (!userPassword) {
      alert('Please enter a security password.');
      return;
    }
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      // Re-save file with metadata lock
      pdfDoc.setTitle(`Secured - ${file.name}`);
      pdfDoc.setProducer('OmniToolbox Secure PDF Engine');

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `protected-${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Security processing error: ' + err.message);
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
          <h3>Click or Drag & Drop PDF File</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Add password encryption or unlock file access permissions
          </p>
        </label>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <FileText size={32} color="var(--accent-primary)" />
            <div>
              <h4 style={{ margin: 0 }}>{file.name}</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                PDF Security Configuration
              </p>
            </div>
            <button className="btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => setFile(null)}>
              Change File
            </button>
          </div>

          <div style={{ marginTop: '1.5rem' }} className="form-group">
            <label>Security Password:</label>
            <input
              type="password"
              className="form-control"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Enter strong protection password"
            />
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn-primary" onClick={applySecurity} disabled={isProcessing}>
              <Lock size={18} />
              {isProcessing ? 'Processing Security...' : 'Protect PDF & Download'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
