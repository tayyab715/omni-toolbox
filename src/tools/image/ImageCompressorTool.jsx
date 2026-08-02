import React, { useState, useRef } from 'react';
import { Upload, Download, Maximize2, RefreshCw } from 'lucide-react';

export default function ImageCompressorTool() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [compressedUrl, setCompressedUrl] = useState('');
  const [quality, setQuality] = useState(75);
  const [origSize, setOrigSize] = useState(0);
  const [compSize, setCompSize] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setOrigSize(selectedFile.size);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      compressImage(selectedFile, quality);
    }
  };

  const compressImage = (imgFile, qualityValue) => {
    setIsCompressing(true);
    const img = new Image();
    img.src = URL.createObjectURL(imgFile);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const format = imgFile.type === 'image/png' ? 'image/png' : 'image/jpeg';
      canvas.toBlob((blob) => {
        if (blob) {
          setCompSize(blob.size);
          const compressedBlobUrl = URL.createObjectURL(blob);
          setCompressedUrl(compressedBlobUrl);
        }
        setIsCompressing(false);
      }, format, qualityValue / 100);
    };
  };

  const handleQualityChange = (val) => {
    setQuality(val);
    if (file) {
      compressImage(file, val);
    }
  };

  const downloadImage = () => {
    if (!compressedUrl || !file) return;
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `compressed-${file.name}`;
    a.click();
  };

  const savingsPct = origSize > 0 && compSize > 0 ? Math.round(((origSize - compSize) / origSize) * 100) : 0;

  return (
    <div className="tool-workspace">
      {!file ? (
        <label className="dropzone">
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} style={{ display: 'none' }} />
          <Upload size={44} className="dropzone-icon" />
          <h3>Click or Drag & Drop Photo to Compress</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Supports JPG, PNG, and WebP images. 100% private browser processing.
          </p>
        </label>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h4>Image Compression Settings</h4>
            <button className="btn-secondary" onClick={() => { setFile(null); setPreviewUrl(''); setCompressedUrl(''); }}>
              Upload New Image
            </button>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Image Quality: <strong>{quality}%</strong></label>
            <input
              type="range"
              min="10"
              max="95"
              value={quality}
              onChange={(e) => handleQualityChange(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            margin: '1.5rem 0'
          }}>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <h5>Original Image</h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0.75rem' }}>
                {(origSize / 1024).toFixed(1)} KB
              </p>
              <img src={previewUrl} alt="Original" style={{ maxWidth: '100%', maxHeight: '240px', borderRadius: 'var(--radius-sm)', objectFit: 'contain' }} />
            </div>

            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <h5>Compressed Preview</h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600, margin: '0.25rem 0 0.75rem' }}>
                {(compSize / 1024).toFixed(1)} KB ({savingsPct > 0 ? `-${savingsPct}% smaller` : 'Optimized'})
              </p>
              <img src={compressedUrl} alt="Compressed" style={{ maxWidth: '100%', maxHeight: '240px', borderRadius: 'var(--radius-sm)', objectFit: 'contain' }} />
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button className="btn-primary" onClick={downloadImage} disabled={isCompressing || !compressedUrl}>
              <Download size={18} />
              Download Compressed Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
