import React, { useState, useEffect } from 'react';
import { Volume2, Play, Pause, Square } from 'lucide-react';

export default function TextToSpeechTool() {
  const [text, setText] = useState('Welcome to OmniToolbox! Experience 100% private, fast client-side web utilities.');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const updateVoices = () => {
      const avail = window.speechSynthesis?.getVoices() || [];
      setVoices(avail);
      if (avail.length > 0 && !selectedVoice) {
        setSelectedVoice(avail[0].name);
      }
    };

    updateVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const speak = () => {
    if (!window.speechSynthesis || !text.trim()) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const vObj = voices.find(v => v.name === selectedVoice);
    if (vObj) utterance.voice = vObj;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (window.speechSynthesis) {
      if (isPlaying) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      }
    }
  };

  const stop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="tool-workspace">
      <div className="form-group">
        <label>Type or Paste Text to Synthesize:</label>
        <textarea
          className="form-control"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="controls-grid" style={{ marginTop: '1.5rem' }}>
        <div className="form-group">
          <label>Select Voice Accent:</label>
          <select
            className="form-control"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {voices.map((v, i) => (
              <option key={i} value={v.name}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Speed Rate: <strong>{rate}x</strong></label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Pitch: <strong>{pitch}</strong></label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
          />
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button className="btn-primary" onClick={speak} disabled={!text.trim()}>
          <Play size={18} /> Play Speech
        </button>
        <button className="btn-secondary" onClick={pause}>
          <Pause size={18} /> Pause / Resume
        </button>
        <button className="btn-secondary" onClick={stop} style={{ color: 'var(--danger)' }}>
          <Square size={18} /> Stop
        </button>
      </div>
    </div>
  );
}
