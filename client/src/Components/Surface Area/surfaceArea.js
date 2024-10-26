import React, { useState } from "react";

const SurfaceAreaWorksheet = () => {
  const [problems, setProblems] = useState([]);
  const [results, setResults] = useState([]);

  const generateRandomDimension = () => Math.floor(Math.random() * 10) + 1;

  const calculateSurfaceArea = (length, width, height) => {
    return 2 * (length * width + length * height + width * height);
  };

  const generatePrismSVG = (length, width, height) => {
    const svgWidth = 300; // Width of the SVG
    const svgHeight = 200; // Height of the SVG

    // Calculate midpoints for the labels
    const midLengthX = 50 + (length * 10) / 2;
    const midWidthX = 50 + length * 10 + (width * 10) / 2;
    const midHeightX = 50 - 5; // X position for height label
    const midHeightY = 150 - (height * 10) / 2; // Y position for height label

    return (
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      >
        {/* Draw the front face */}
        <polygon
          points={`${50},${150} ${50 + length * 10},${150} ${
            50 + length * 10
          },${150 - height * 10} ${50},${150 - height * 10}`}
          fill="#ADD8E6"
        />
        {/* Draw the top face */}
        <polygon
          points={`${50},${150 - height * 10} ${50 + length * 10},${
            150 - height * 10
          } ${50 + length * 10 + width * 10},${
            150 - height * 10 - width * 10
          } ${50 + width * 10},${150 - height * 10 - width * 10}`}
          fill="#B0E0E6"
        />
        {/* Draw the side face */}
        <polygon
          points={`${50 + length * 10},${150} ${50 + length * 10},${
            150 - height * 10
          } ${50 + length * 10 + width * 10},${
            150 - height * 10 - width * 10
          } ${50 + length * 10 + width * 10},${150 - width * 10}`}
          fill="#87CEFA"
        />
        {/* Draw dimension labels */}
        <text x={midLengthX} y="157" fontSize="12" textAnchor="middle">
          {length}
        </text>{" "}
        {/* Length */}
        <text
          x={midWidthX + 2}
          y={`${150 - (height * 10) / 2 + 2}`}
          fontSize="12"
          textAnchor="middle"
        >
          {width}
        </text>{" "}
        {/* Width */}
        <text
          x={midHeightX}
          y={midHeightY - 5}
          fontSize="12"
          transform={`rotate(-45, ${midHeightX}, ${midHeightY - 5})`}
          textAnchor="end"
        >
          {height}
        </text>{" "}
        {/* Height */}
      </svg>
    );
  };

  const generateProblems = () => {
    const newProblems = [];
    const numProblems = 5; // Number of problems to generate

    for (let i = 0; i < numProblems; i++) {
      const length = generateRandomDimension();
      const width = generateRandomDimension();
      const height = generateRandomDimension();
      const surfaceArea = calculateSurfaceArea(length, width, height);

      newProblems.push({ length, width, height, surfaceArea });
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
      <h1>Surface Area of Rectangular Prisms</h1>
      <div id="problems">
        {problems.map((problem, index) => (
          <div key={index} className="problem">
            <p>
              Problem {index + 1}: Find the surface area of the rectangular
              prism.
            </p>
            {generatePrismSVG(problem.length, problem.width, problem.height)}
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

export default SurfaceAreaWorksheet;
