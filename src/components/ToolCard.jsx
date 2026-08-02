import React from 'react';
import * as Icons from 'lucide-react';

export default function ToolCard({ tool, onClick }) {
  const IconComponent = Icons[tool.iconName] || Icons.Wrench;

  return (
    <div className="tool-card" onClick={() => onClick(tool.id)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="tool-card-icon">
          <IconComponent size={24} />
        </div>
        {tool.badge && <span className="tool-card-badge">{tool.badge}</span>}
      </div>
      <h3 className="tool-card-title">{tool.title}</h3>
      <p className="tool-card-desc">{tool.shortDesc}</p>
    </div>
  );
}
