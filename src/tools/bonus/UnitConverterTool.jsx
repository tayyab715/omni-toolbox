import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

const CONVERSIONS = {
  length: {
    name: 'Length',
    units: {
      m: { name: 'Meters (m)', factor: 1 },
      km: { name: 'Kilometers (km)', factor: 1000 },
      cm: { name: 'Centimeters (cm)', factor: 0.01 },
      mm: { name: 'Millimeters (mm)', factor: 0.001 },
      mi: { name: 'Miles (mi)', factor: 1609.34 },
      ft: { name: 'Feet (ft)', factor: 0.3048 },
      in: { name: 'Inches (in)', factor: 0.0254 }
    }
  },
  weight: {
    name: 'Weight / Mass',
    units: {
      kg: { name: 'Kilograms (kg)', factor: 1 },
      g: { name: 'Grams (g)', factor: 0.001 },
      mg: { name: 'Milligrams (mg)', factor: 0.000001 },
      lb: { name: 'Pounds (lbs)', factor: 0.453592 },
      oz: { name: 'Ounces (oz)', factor: 0.0283495 }
    }
  },
  digital: {
    name: 'Digital Data Storage',
    units: {
      B: { name: 'Bytes (B)', factor: 1 },
      KB: { name: 'Kilobytes (KB)', factor: 1024 },
      MB: { name: 'Megabytes (MB)', factor: 1048576 },
      GB: { name: 'Gigabytes (GB)', factor: 1073741824 },
      TB: { name: 'Terabytes (TB)', factor: 1099511627776 }
    }
  }
};

export default function UnitConverterTool() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [val, setVal] = useState('1');

  const catData = CONVERSIONS[category];
  const unitsObj = catData.units;

  const numVal = parseFloat(val) || 0;
  const fromFactor = unitsObj[fromUnit]?.factor || 1;
  const toFactor = unitsObj[toUnit]?.factor || 1;

  // Conversion formula: (Val * fromFactor) / toFactor
  const converted = (numVal * fromFactor) / toFactor;

  const handleCategoryChange = (c) => {
    setCategory(c);
    const uKeys = Object.keys(CONVERSIONS[c].units);
    setFromUnit(uKeys[0]);
    setToUnit(uKeys[1] || uKeys[0]);
  };

  return (
    <div className="tool-workspace">
      <div className="category-filter" style={{ marginBottom: '1.5rem' }}>
        {Object.keys(CONVERSIONS).map(c => (
          <button
            key={c}
            className={`filter-btn ${category === c ? 'active' : ''}`}
            onClick={() => handleCategoryChange(c)}
          >
            {CONVERSIONS[c].name}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
        <div>
          <div className="form-group">
            <label>From Value:</label>
            <input
              type="number"
              className="form-control"
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label>From Unit:</label>
            <select
              className="form-control"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
            >
              {Object.keys(unitsObj).map(u => (
                <option key={u} value={u}>{unitsObj[u].name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            background: 'var(--accent-light)',
            color: 'var(--accent-primary)',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto'
          }}>
            <ArrowLeftRight size={24} />
          </div>
        </div>

        <div>
          <div className="form-group">
            <label>Converted Result:</label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={converted.toLocaleString(undefined, { maximumFractionDigits: 6 })}
              style={{ fontWeight: 700, color: 'var(--accent-primary)', background: 'var(--bg-secondary)' }}
            />
          </div>
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label>To Unit:</label>
            <select
              className="form-control"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
            >
              {Object.keys(unitsObj).map(u => (
                <option key={u} value={u}>{unitsObj[u].name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
