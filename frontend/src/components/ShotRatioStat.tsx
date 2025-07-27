import React from "react";

export function ShotRatioStat({ value }: { value: number }) {
  return (
    <div className="flex justify-center items-end w-full" style={{ minHeight: "6.5rem" }}>
      <div
        className="radial-progress"
        style={{ "--size": "6rem", "--value": value * 100 } as React.CSSProperties}
        aria-valuenow={value * 100}
        role="progressbar"
      >
        {(value * 100).toFixed(0)}%
      </div>
    </div>
  );
}