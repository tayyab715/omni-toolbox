import React, { useState } from 'react';
import { AlignLeft, Clock, FileText, Hash } from 'lucide-react';

export default function WordCounterTool() {
  const [text, setText] = useState('');

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
  const readTimeMinutes = Math.ceil(words / 200);

  return (
    <div className="tool-workspace">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-primary)', margin: 0 }}>{words}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Words</p>
        </div>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-primary)', margin: 0 }}>{chars}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Characters (With Spaces)</p>
        </div>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-primary)', margin: 0 }}>{sentences}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Sentences</p>
        </div>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-primary)', margin: 0 }}>{paragraphs}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Paragraphs</p>
        </div>
        <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-primary)', margin: 0 }}>~{readTimeMinutes} min</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Estimated Read Time</p>
        </div>
      </div>

      <div className="form-group">
        <label>Type or Paste Text to Analyze:</label>
        <textarea
          className="form-control"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content here to view real-time statistics..."
        />
      </div>
    </div>
  );
}
