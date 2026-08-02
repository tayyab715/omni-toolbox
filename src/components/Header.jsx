import React from 'react';
import { Wrench, Sun, Moon, Search, ShieldCheck } from 'lucide-react';

export default function Header({ currentTheme, onToggleTheme, searchQuery, setSearchQuery, onGoHome }) {
  return (
    <header className="site-header">
      <div className="nav-container">
        <div className="logo-group" onClick={onGoHome} title="OmniToolbox Home">
          <div className="logo-badge">
            <Wrench size={22} />
          </div>
          <span>OmniToolbox</span>
        </div>

        <div className="nav-controls">
          <div className="search-input-wrapper">
            <Search size={16} />
            <input
              type="text"
              className="search-input"
              placeholder="Search tools (e.g. PDF, Image)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={`Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
