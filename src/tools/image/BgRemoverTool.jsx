import React, { useState } from 'react';
import { Upload, Download, Sparkles } from 'lucide-react';

export default function BgRemoverTool() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [processedUrl, setProcessedUrl] = useState('');
  const [tolerance, setTolerance] = useState(30);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
      processBackgroundRemoval(url, tolerance);
    }
  };

  const processBackgroundRemoval = (imgUrl, tolVal) => {
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Sample top-left corner pixel as background color reference
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Euclidean color distance check
        const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
        if (dist < tolVal * 2.5) {
          data[i + 3] = 0; // Set Alpha to 0 (Transparent)
        }
      }

      ctx.putImageData(imgData, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          setProcessedUrl(URL.createObjectURL(blob));
        }
      }, 'image/png');
    };
  };

  const handleToleranceChange = (val) => {
    setTolerance(val);
    if (previewUrl) {
      processBackgroundRemoval(previewUrl, val);
    }
  };

  const downloadTransparentPng = () => {
    if (!processedUrl || !file) return;
    const a = document.createElement('a');
    a.href = processedUrl;
    a.download = `transparent-${file.name.substring(0, file.name.lastIndexOf('.'))}.png`;
    a.click();
  };

  return (
    <div className="tool-workspace">
      {!file ? (
        <label className="dropzone">
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          <Upload size={44} className="dropzone-icon" />
          <h3>Click or Drag & Drop Photo to Remove Background</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Erases solid and near-solid background colors into transparent PNGs
          </p>
        </label>
      ) : (
        <div>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Color Sensitivity Threshold: <strong>{tolerance}</strong></label>
            <input
              type="range"
              min="5"
              max="80"
              value={tolerance}
              onChange={(e) => handleToleranceChange(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <h5>Original Image</h5>
              <img src={previewUrl} alt="Original" style={{ maxWidth: '100%', maxHeight: '220px', objectFit: 'contain', marginTop: '0.5rem' }} />
            </div>

            <div style={{
              background: 'repeating-conic-gradient(#e2e8f0 0% 25%, #ffffff 0% 50%) 50% / 16px 16px',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <h5 style={{ background: 'rgba(255,255,255,0.9)', display: 'inline-block', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                Transparent Result
              </h5>
              <br />
              <img src={processedUrl} alt="Transparent Result" style={{ maxWidth: '100%', maxHeight: '220px', objectFit: 'contain', marginTop: '0.5rem' }} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn-primary" onClick={downloadTransparentPng} disabled={!processedUrl}>
              <Sparkles size={18} />
              Download Transparent PNG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
