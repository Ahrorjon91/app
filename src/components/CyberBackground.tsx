import React from 'react';

export const CyberBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ contain: 'strict' }}
    >
      {/* Crisp Static Cyber Grid (Zero frame repaints) */}
      <div className="absolute inset-0 bg-cyber-grid opacity-25 dark:opacity-35" />

      {/* Static Ambient Radial Glows (Baked into GPU background layer once, 0% CPU/GPU load) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 10%, rgba(6, 182, 212, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 90% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 35% 85%, rgba(59, 130, 246, 0.06) 0%, transparent 40%)
          `,
        }}
      />
    </div>
  );
};
