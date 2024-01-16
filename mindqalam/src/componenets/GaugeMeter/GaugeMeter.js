import React, { useEffect, useState } from "react";
import "./GaugeMeter.css";

function GaugeMeter({ lowerValue, higherValue, currentValue }) {
  const [animatedValue, setAnimatedValue] = useState(lowerValue);

  useEffect(() => {
    setAnimatedValue(currentValue);
  }, [currentValue]);

  const rotation =
    ((animatedValue - lowerValue) / (higherValue - lowerValue)) * 180;

  return (
    <div className="gauge-container">
      <div className="gauge">
        {/* Optional: Add scale marks and labels here */}
      </div>
      <div
        className="gauge-needle"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
}

export default GaugeMeter;
