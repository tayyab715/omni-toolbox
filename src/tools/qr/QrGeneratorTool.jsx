import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode, Wifi, User, Link, FileText } from 'lucide-react';

export default function QrGeneratorTool() {
  const [qrType, setQrType] = useState('url');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  
  // Input fields
  const [textVal, setTextVal] = useState('https://omnitoolbox.app');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');

  // vCard fields
  const [vFirstName, setVFirstName] = useState('');
  const [vLastName, setVLastName] = useState('');
  const [vPhone, setVPhone] = useState('');
  const [vEmail, setVEmail] = useState('');
  const [vCompany, setVCompany] = useState('');

  const [qrDataUrl, setQrDataUrl] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    generateQr();
  }, [qrType, textVal, wifiSsid, wifiPassword, wifiEncryption, vFirstName, vLastName, vPhone, vEmail, vCompany, fgColor, bgColor]);

  const getPayload = () => {
    if (qrType === 'url' || qrType === 'text') {
      return textVal || 'https://omnitoolbox.app';
    } else if (qrType === 'wifi') {
      return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};;`;
    } else if (qrType === 'vcard') {
      return `BEGIN:VCARD\nVERSION:3.0\nN:${vLastName};${vFirstName}\nFN:${vFirstName} ${vLastName}\nORG:${vCompany}\nTEL:${vPhone}\nEMAIL:${vEmail}\nEND:VCARD`;
    }
    return 'OmniToolbox';
  };

  const generateQr = async () => {
    const payload = getPayload();
    try {
      const url = await QRCode.toDataURL(payload, {
        width: 300,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQr = (format) => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `qrcode-${qrType}-${Date.now()}.${format}`;
    a.click();
  };

  return (
    <div className="tool-workspace">
      <div className="category-filter" style={{ marginBottom: '1.5rem' }}>
        <button className={`filter-btn ${qrType === 'url' ? 'active' : ''}`} onClick={() => setQrType('url')}>
          <Link size={14} style={{ marginRight: 6 }} /> Web URL
        </button>
        <button className={`filter-btn ${qrType === 'text' ? 'active' : ''}`} onClick={() => setQrType('text')}>
          <FileText size={14} style={{ marginRight: 6 }} /> Plain Text
        </button>
        <button className={`filter-btn ${qrType === 'wifi' ? 'active' : ''}`} onClick={() => setQrType('wifi')}>
          <Wifi size={14} style={{ marginRight: 6 }} /> WiFi Login
        </button>
        <button className={`filter-btn ${qrType === 'vcard' ? 'active' : ''}`} onClick={() => setQrType('vcard')}>
          <User size={14} style={{ marginRight: 6 }} /> vCard Contact
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {/* Form Controls */}
        <div>
          {(qrType === 'url' || qrType === 'text') && (
            <div className="form-group">
              <label>{qrType === 'url' ? 'Website URL:' : 'Text Content:'}</label>
              <textarea
                className="form-control"
                rows={4}
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                placeholder={qrType === 'url' ? 'https://example.com' : 'Enter plain text...'}
              />
            </div>
          )}

          {qrType === 'wifi' && (
            <div className="controls-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="form-group">
                <label>Network Name (SSID):</label>
                <input
                  type="text"
                  className="form-control"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="MyHomeWiFi"
                />
              </div>
              <div className="form-group">
                <label>WiFi Password:</label>
                <input
                  type="text"
                  className="form-control"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="SecretPassword123"
                />
              </div>
              <div className="form-group">
                <label>Encryption Type:</label>
                <select
                  className="form-control"
                  value={wifiEncryption}
                  onChange={(e) => setWifiEncryption(e.target.value)}
                >
                  <option value="WPA">WPA / WPA2 / WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>
            </div>
          )}

          {qrType === 'vcard' && (
            <div className="controls-grid">
              <div className="form-group">
                <label>First Name:</label>
                <input type="text" className="form-control" value={vFirstName} onChange={(e) => setVFirstName(e.target.value)} placeholder="John" />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input type="text" className="form-control" value={vLastName} onChange={(e) => setVLastName(e.target.value)} placeholder="Doe" />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input type="text" className="form-control" value={vPhone} onChange={(e) => setVPhone(e.target.value)} placeholder="+1234567890" />
              </div>
              <div className="form-group">
                <label>Email Address:</label>
                <input type="email" className="form-control" value={vEmail} onChange={(e) => setVEmail(e.target.value)} placeholder="john@example.com" />
              </div>
            </div>
          )}

          {/* Color Customization */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Foreground Color:</label>
              <input type="color" className="form-control" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={{ height: '42px', padding: '2px' }} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Background Color:</label>
              <input type="color" className="form-control" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ height: '42px', padding: '2px' }} />
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div style={{ textAlign: 'center', background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
          <h4>Live QR Code Preview</h4>
          <div style={{ margin: '1rem 0' }}>
            {qrDataUrl && <img src={qrDataUrl} alt="QR Code" style={{ maxWidth: '240px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }} />}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <button className="btn-primary" onClick={() => downloadQr('png')}>
              <Download size={16} /> Download PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
