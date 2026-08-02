import React from 'react';
import { Shield, Zap, Lock, DollarSign } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="trust-badges-row">
      <div className="trust-badge">
        <DollarSign size={16} color="var(--success)" />
        <span>100% Free Always</span>
      </div>
      <div className="trust-badge">
        <Lock size={16} color="var(--accent-primary)" />
        <span>No Signup Required</span>
      </div>
      <div className="trust-badge">
        <Shield size={16} color="var(--warning)" />
        <span>100% Private (Files Stay in Browser)</span>
      </div>
      <div className="trust-badge">
        <Zap size={16} color="var(--accent-primary)" />
        <span>Instant Page Speed</span>
      </div>
    </div>
  );
}
