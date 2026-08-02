import React, { useState } from 'react';
import { Upload, Download, Scaling } from 'lucide-react';

export default function ImageResizerTool() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [origDimensions, setOrigDimensions] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);

      const img = new Image();
      img.src = url;
      img.onload = () => {
        setOrigDimensions({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
    }
  };

  const handleWidthChange = (val) => {
    const newW = Number(val);
    setWidth(newW);
    if (lockAspect && origDimensions.width > 0) {
      const ratio = origDimensions.height / origDimensions.width;
      setHeight(Math.round(newW * ratio));
    }
  };

  const handleHeightChange = (val) => {
    const newH = Number(val);
    setHeight(newH);
    if (lockAspect && origDimensions.height > 0) {
      const ratio = origDimensions.width / origDimensions.height;
      setWidth(Math.round(newH * ratio));
    }
  };

  const resizeImage = () => {
    if (!file || width <= 0 || height <= 0) return;

    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resized-${width}x${height}-${file.name}`;
        a.click();
        URL.revokeObjectURL(url);
      }, file.type || 'image/jpeg', 0.9);
    };
  };

  return (
    <div className="tool-workspace">
      {!file ? (
        <label className="dropzone">
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          <Upload size={44} className="dropzone-icon" />
          <h3>Click or Drag & Drop Image to Resize</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Change dimensions in pixels with aspect ratio preservation
          </p>
        </label>
      ) : (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <img src={previewUrl} alt="Preview" style={{ maxHeight: '200px', borderRadius: 'var(--radius-md)', objectFit: 'contain' }} />
            <p style={{ margin: '0.5rem 0', color: 'var(--text-muted)' }}>
              Original Dimensions: <strong>{origDimensions.width} x {origDimensions.height} px</strong>
            </p>
          </div>

          <div className="controls-grid">
            <div className="form-group">
              <label>Width (Pixels):</label>
              <input
                type="number"
                className="form-control"
                value={width}
                onChange={(e) => handleWidthChange(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Height (Pixels):</label>
              <input
                type="number"
                className="form-control"
                value={height}
                onChange={(e) => handleHeightChange(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input
              type="checkbox"
              id="aspectCheck"
              checked={lockAspect}
              onChange={(e) => setLockAspect(e.target.checked)}
            />
            <label htmlFor="aspectCheck" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
              Maintain original aspect ratio
            </label>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn-primary" onClick={resizeImage}>
              <Scaling size={18} />
              Resize Image & Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
