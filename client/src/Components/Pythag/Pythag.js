import React, { useState } from "react";

const PythagoreanSVG = ({ a, b, c, missing }) => {
  const scale = 20; // Adjust scale factor for sizing
  const offsetX = 100; // X-axis offset to position the triangle
  const offsetY = 250; // Y-axis offset to position the triangle

  return (
    <svg width="500" height="500" style={{ border: "1px solid black" }}>
      {/* Draw the right triangle */}
      <polygon
        points={`${offsetX},${offsetY} ${
          offsetX + a * scale
        },${offsetY} ${offsetX},${offsetY - b * scale}`}
        fill="none"
        stroke="black"
      />

      {/* Square on side A */}
      {missing !== "a" && (
        <rect
          x={offsetX - a * scale} // Position left of side A
          y={offsetY - a * scale} // Aligned with the triangle's bottom corner
          width={a * scale}
          height={a * scale}
          fill="lightblue"
          stroke="blue"
        />
      )}

      {/* Square on side B */}
      {missing !== "b" && (
        <rect
          x={offsetX + a * scale} // Position to the right of side B
          y={offsetY - b * scale} // Aligned with the triangle's top-right corner
          width={b * scale}
          height={b * scale}
          fill="lightgreen"
          stroke="green"
        />
      )}

      {/* Square on the hypotenuse */}
      {missing !== "c" && (
        <rect
          x={offsetX} // Place square directly on the hypotenuse
          y={offsetY - b * scale} // Start from top of triangle
          width={c * scale}
          height={c * scale}
          fill="lightcoral"
          stroke="red"
          transform={`rotate(-45, ${offsetX}, ${offsetY})`} // Rotate 45 degrees to align with hypotenuse
        />
      )}
    </svg>
  );
};

const generateRandomProblem = () => {
  const a = Math.floor(Math.random() * 7) + 3; // Generate random side length A
  const b = Math.floor(Math.random() * 7) + 3; // Generate random side length B
  const c = Math.sqrt(a ** 2 + b ** 2).toFixed(2); // Calculate hypotenuse length C
  const missing = Math.random() < 0.5 ? "a" : Math.random() < 0.5 ? "b" : "c"; // Randomly choose missing value
  return {
    a: missing === "a" ? null : a,
    b: missing === "b" ? null : b,
    c: missing === "c" ? null : c,
    missing,
  };
};

const PythagoreanSVGWorksheet = () => {
  const [problems, setProblems] = useState([]);

  const generateProblems = () => {
    const newProblems = Array.from({ length: 10 }, generateRandomProblem); // Generate 10 problems
    setProblems(newProblems);
  };

  return (
    <div>
      <h1>Pythagorean Theorem Worksheet (SVG)</h1>
      <button onClick={generateProblems}>Generate Problems</button>
      {problems.map((problem, index) => (
        <div key={index}>
          <h2>Problem {index + 1}</h2>
          <PythagoreanSVG {...problem} />
          <p>Find the missing value: {problem.missing.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );
};

export default PythagoreanSVGWorksheet;
