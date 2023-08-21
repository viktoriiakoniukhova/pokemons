import React from "react";

export default function Loader({ color }) {
  return (
    <div className="loader">
      <div
        style={{
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
      <div
        style={{
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
      <div
        style={{
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
      <div
        style={{
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
    </div>
  );
}
