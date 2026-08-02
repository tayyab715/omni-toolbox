import React from 'react';
import { Wrench, Shield, Lock, FileText } from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';

export default function Footer({ onSelectTool }) {
  const pdfTools = TOOLS_DATA.filter(t => t.category === 'pdf');
  const imageTools = TOOLS_DATA.filter(t => t.category === 'image');

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col">
          <div className="logo-group" style={{ marginBottom: '0.75rem' }}>
            <div className="logo-badge">
              <Wrench size={20} />
            </div>
            <span>OmniToolbox</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            100% free, browser-based online tools for PDF processing, image optimization, QR code generation, and productivity utilities.
          </p>
        </div>

        <div className="footer-col">
          <h4>PDF Tools</h4>
          <ul className="footer-links">
            {pdfTools.slice(0, 5).map(tool => (
              <li key={tool.id}>
                <a href={`#/${tool.id}`} onClick={(e) => { e.preventDefault(); onSelectTool(tool.id); }}>
                  {tool.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Image & QR Tools</h4>
          <ul className="footer-links">
            {imageTools.slice(0, 4).map(tool => (
              <li key={tool.id}>
                <a href={`#/${tool.id}`} onClick={(e) => { e.preventDefault(); onSelectTool(tool.id); }}>
                  {tool.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#/qr-generator" onClick={(e) => { e.preventDefault(); onSelectTool('qr-generator'); }}>
                QR Code Generator
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Privacy & Security</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            🔒 All conversions happen 100% inside your web browser using WebAssembly. No files are uploaded to any external server.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} OmniToolbox. All rights reserved. Built with 100% Client-Side Web Technology.</p>
      </div>
    </footer>
  );
}
