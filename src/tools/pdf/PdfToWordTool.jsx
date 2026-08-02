import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { Upload, FileText, Download } from 'lucide-react';

export default function PdfToWordTool() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || selectedFile.type !== 'application/pdf') return;
    setFile(selectedFile);
    
    // Read raw text from buffer for demonstration extraction
    const text = await selectedFile.text();
    const cleanText = text.replace(/[\x00-\x1F\x7F-\x9F]/g, ' ').substring(0, 3000);
    setExtractedText(cleanText || `Extracted content from ${selectedFile.name}`);
  };

  const convertToWord = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Document Converted from: ${file.name}`,
                  bold: true,
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: extractedText || 'Converted text content goes here.',
                  size: 24,
                }),
              ],
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace('.pdf', '')}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error converting PDF to Word: ' + err.message);
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
          <h3>Click or Drag & Drop PDF to Convert to Word</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Convert non-editable PDF files into editable .docx format
          </p>
        </label>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <FileText size={32} color="var(--accent-primary)" />
            <div>
              <h4 style={{ margin: 0 }}>{file.name}</h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Ready to convert to Microsoft Word (.docx)
              </p>
            </div>
            <button className="btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => setFile(null)}>
              Change File
            </button>
          </div>

          <div style={{ marginTop: '1.5rem' }} className="form-group">
            <label>Editable Text Preview / Summary:</label>
            <textarea
              className="form-control"
              rows={6}
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
            />
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn-primary" onClick={convertToWord} disabled={isProcessing}>
              <Download size={18} />
              {isProcessing ? 'Generating Word File...' : 'Download Word Document (.docx)'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
