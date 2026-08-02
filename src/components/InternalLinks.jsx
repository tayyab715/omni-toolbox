import React from 'react';
import * as Icons from 'lucide-react';
import { TOOLS_DATA } from '../data/toolsData';

export default function InternalLinks({ currentToolId, onSelectTool }) {
  const currentTool = TOOLS_DATA.find(t => t.id === currentToolId);
  if (!currentTool) return null;

  // Filter tools in same category excluding current tool
  const related = TOOLS_DATA
    .filter(t => t.category === currentTool.category && t.id !== currentToolId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="related-tools-section">
      <h3>Related {currentTool.category.toUpperCase()} Tools You Might Need</h3>
      <div className="related-grid">
        {related.map(tool => {
          const IconComp = Icons[tool.iconName] || Icons.Wrench;
          return (
            <div
              key={tool.id}
              className="related-card"
              onClick={() => onSelectTool(tool.id)}
              style={{ cursor: 'pointer' }}
            >
              <IconComp size={18} color="var(--accent-primary)" />
              <span>{tool.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
