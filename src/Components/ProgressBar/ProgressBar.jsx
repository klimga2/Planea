import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, color, lightColor }) => {
  return (
    <div className="progress-bar-background" style={{ backgroundColor: lightColor }}>
      <div
        className="progress-bar-foreground"
        style={{ width: `${progress}%`, backgroundColor: color }}
      ></div>
    </div>
  );
};

export default ProgressBar;
