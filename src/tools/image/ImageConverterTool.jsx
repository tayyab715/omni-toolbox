import React, { useState } from 'react';
import { Upload, Download, Repeat } from 'lucide-react';

export default function ImageConverterTool() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [targetFormat, setTargetFormat] = useState('image/png');
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const convertFormat = () => {
    if (!file) return;
    setIsConverting(true);

    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      // Handle white background for JPG conversion from PNG
      if (targetFormat === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, img.width, img.height);
      }
      ctx.drawImage(img, 0, 0);

      const extMap = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/webp': '.webp'
      };

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const newExt = extMap[targetFormat] || '.png';
        a.download = `converted-${file.name.substring(0, file.name.lastIndexOf('.'))}${newExt}`;
        a.click();
        URL.revokeObjectURL(url);
        setIsConverting(false);
      }, targetFormat, 0.92);
    };
  };

  return (
    <div className="tool-workspace">
      {!file ? (
        <label className="dropzone">
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          <Upload size={44} className="dropzone-icon" />
          <h3>Click or Drag & Drop Image to Convert</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Convert between JPG, PNG, and WebP instantly
          </p>
        </label>
      ) : (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <img src={previewUrl} alt="Preview" style={{ maxHeight: '220px', borderRadius: 'var(--radius-md)', objectFit: 'contain' }} />
            <p style={{ margin: '0.5rem 0', fontWeight: 500 }}>{file.name}</p>
            <button className="btn-secondary" onClick={() => { setFile(null); setPreviewUrl(''); }}>
              Select Different Image
            </button>
          </div>

          <div className="controls-grid">
            <div className="form-group">
              <label>Select Target Output Format:</label>
              <select
                className="form-control"
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
              >
                <option value="image/png">PNG (.png) - High Quality Transparent</option>
                <option value="image/jpeg">JPG / JPEG (.jpg) - Universal Photo</option>
                <option value="image/webp">WebP (.webp) - Modern Web Fast</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn-primary" onClick={convertFormat} disabled={isConverting}>
              <Repeat size={18} />
              {isConverting ? 'Converting...' : 'Convert Format & Download'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
