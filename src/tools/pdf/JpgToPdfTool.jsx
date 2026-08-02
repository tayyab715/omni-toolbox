import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, FilePlus, Image as ImageIcon } from 'lucide-react';

export default function JpgToPdfTool() {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
    setImages(prev => [...prev, ...selected]);
  };

  const convertImagesToPdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const imgFile of images) {
        const arrayBuffer = await imgFile.arrayBuffer();
        let embeddedImage;

        if (imgFile.type === 'image/png') {
          embeddedImage = await pdfDoc.embedPng(arrayBuffer);
        } else {
          embeddedImage = await pdfDoc.embedJpg(arrayBuffer);
        }

        const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: embeddedImage.width,
          height: embeddedImage.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `images-compiled-${Date.now()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error embedding images into PDF: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="tool-workspace">
      <label className="dropzone">
        <input type="file" multiple accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        <Upload size={44} className="dropzone-icon" />
        <h3>Click or Drag & Drop Images (JPG, PNG, WebP)</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Select multiple photos to combine into a multi-page PDF
        </p>
      </label>

      {images.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Selected Images ({images.length}):</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {images.map((img, idx) => (
              <div key={idx} style={{
                position: 'relative',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem',
                textAlign: 'center',
                border: '1px solid var(--border-color)'
              }}>
                <ImageIcon size={28} color="var(--accent-primary)" style={{ margin: '0.5rem auto' }} />
                <p style={{ fontSize: '0.75rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {img.name}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn-primary" onClick={convertImagesToPdf} disabled={isProcessing}>
              <Download size={18} />
              {isProcessing ? 'Generating PDF...' : 'Convert Images to PDF'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
