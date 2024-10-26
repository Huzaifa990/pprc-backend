import React, { useState } from "react";

const SurfaceAreaTriangularPrismWorksheet = () => {
  const [problems, setProblems] = useState([]);
  const [results, setResults] = useState([]);

  const generateRandomDimension = (min = 3, max = 10) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const calculateSurfaceArea = (baseLength, heightTriangle, heightPrism) => {
    // Area of the triangular base
    const areaTriangle = (baseLength * heightTriangle) / 2;
    // Surface area of the prism: 2 * area of triangle + perimeter of triangle * height of prism
    const perimeterTriangle =
      baseLength +
      Math.sqrt(Math.pow(baseLength / 2, 2) + Math.pow(heightTriangle, 2)) * 2;
    return 2 * areaTriangle + perimeterTriangle * heightPrism;
  };

  const generatePrismSVG = (baseLength, heightTriangle, heightPrism) => {
    const svgWidth = 300; // Width of the SVG
    const svgHeight = 200; // Height of the SVG

    // Define points for the triangular prism
    const p1 = { x: 50, y: 150 }; // Bottom left
    const p2 = { x: 50 + baseLength * 10, y: 150 }; // Bottom right
    const p3 = { x: 50 + (baseLength * 10) / 2, y: 150 - heightTriangle * 10 }; // Top vertex
    const p4 = { x: 50, y: 150 - heightPrism * 10 }; // Bottom left back
    const p5 = { x: 50 + baseLength * 10, y: 150 - heightPrism * 10 }; // Bottom right back
    const p6 = {
      x: 50 + (baseLength * 10) / 2,
      y: 150 - heightTriangle * 10 - heightPrism * 10,
    }; // Top vertex back

    return (
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      >
        {/* Draw the triangular face with transparency */}
        <polygon
          points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
          fill="rgba(135, 206, 250, 0.5)"
          stroke="#000"
          strokeWidth="1"
        />
        {/* Draw the back triangular face with transparency */}
        <polygon
          points={`${p4.x},${p4.y} ${p5.x},${p5.y} ${p6.x},${p6.y}`}
          fill="rgba(163, 193, 218, 0.5)"
          stroke="#000"
          strokeWidth="1"
        />
        {/* Draw the rectangular faces with transparency */}
        <polygon
          points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p5.x},${p5.y} ${p4.x},${p4.y}`}
          fill="rgba(176, 224, 230, 0.5)"
          stroke="#000"
          strokeWidth="1"
        />
        <polygon
          points={`${p3.x},${p3.y} ${p6.x},${p6.y} ${p5.x},${p5.y} ${p2.x},${p2.y}`}
          fill="rgba(176, 224, 230, 0.5)"
          stroke="#000"
          strokeWidth="1"
        />
        <polygon
          points={`${p3.x},${p3.y} ${p6.x},${p6.y} ${p4.x},${p4.y} ${p1.x},${p1.y}`}
          fill="rgba(176, 224, 230, 0.5)"
          stroke="#000"
          strokeWidth="1"
        />
        {/* Draw dotted lines for the back edges */}
        <line
          x1={p4.x}
          y1={p4.y}
          x2={p5.x}
          y2={p5.y}
          stroke="#000"
          strokeWidth="1"
          strokeDasharray="4"
        />
        <line
          x1={p6.x}
          y1={p6.y}
          x2={p5.x}
          y2={p5.y}
          stroke="#000"
          strokeWidth="1"
          strokeDasharray="4"
        />
        <line
          x1={p6.x}
          y1={p6.y}
          x2={p4.x}
          y2={p4.y}
          stroke="#000"
          strokeWidth="1"
          strokeDasharray="4"
        />
        {/* Draw dotted line for the height of the triangle */}
        <line
          x1={p3.x}
          y1={p3.y}
          x2={p3.x}
          y2={p1.y}
          stroke="#000"
          strokeWidth="1"
          strokeDasharray="4"
        />
        {/* Draw dimension labels, positioned close to the lines */}
        <text
          x={p1.x + (baseLength * 10) / 2}
          y="155"
          fontSize="12"
          textAnchor="middle"
        >
          {baseLength}
        </text>{" "}
        {/* Base Length */}
        <text x={p3.x + 5} y={p3.y - 15} fontSize="12" textAnchor="middle">
          {heightTriangle}
        </text>{" "}
        {/* Height of Triangle */}
        <text
          x={p4.x - 10}
          y={p4.y - (heightPrism * 10) / 2 + 3}
          fontSize="12"
          transform={`rotate(-90, ${p4.x - 10}, ${
            p4.y - (heightPrism * 10) / 2 + 3
          })`}
          textAnchor="middle"
        >
          {heightPrism}
        </text>{" "}
        {/* Height of Prism */}
      </svg>
    );
  };

  const generateProblems = () => {
    const newProblems = [];
    const numProblems = 5; // Number of problems to generate

    for (let i = 0; i < numProblems; i++) {
      const baseLength = generateRandomDimension(5); // Minimum base length of 5
      const heightTriangle = generateRandomDimension(4); // Minimum height of 4
      const heightPrism = generateRandomDimension(); // Height of the prism can still be from 1 to 10
      const surfaceArea = calculateSurfaceArea(
        baseLength,
        heightTriangle,
        heightPrism
      );

      newProblems.push({
        baseLength,
        heightTriangle,
        heightPrism,
        surfaceArea,
      });
    }

    setProblems(newProblems);
    setResults([]); // Reset results when generating new problems
  };

  const checkAnswers = () => {
    const answerResults = problems.map((problem, index) => {
      const userAnswer = document.getElementById(`answer${index}`).value;
      return parseInt(userAnswer) === problem.surfaceArea
        ? `Problem ${index + 1}: Correct!`
        : `Problem ${index + 1}: Incorrect. The correct answer is ${
            problem.surfaceArea
          }.`;
    });
    setResults(answerResults);
  };

  return (
    <div>
      <h1>Surface Area of Triangular Prisms</h1>
      <div id="problems">
        {problems.map((problem, index) => (
          <div key={index} className="problem">
            <p>
              Problem {index + 1}: Find the surface area of the triangular
              prism.
            </p>
            {generatePrismSVG(
              problem.baseLength,
              problem.heightTriangle,
              problem.heightPrism
            )}
            <p>
              Your answer: <input type="number" id={`answer${index}`} />
            </p>
          </div>
        ))}
      </div>
      <button onClick={generateProblems}>Generate New Problems</button>
      <button onClick={checkAnswers}>Check Answers</button>
      <div id="results">
        {results.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
    </div>
  );
};

export default SurfaceAreaTriangularPrismWorksheet;
