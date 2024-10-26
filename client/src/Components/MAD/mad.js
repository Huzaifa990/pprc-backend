import React, { useState } from "react";
import { jsPDF } from "jspdf";

const MadWorksheet = () => {
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(10);
  const [numSize, setNumSize] = useState(5);
  const [numProblems, setNumProblems] = useState(3);
  const [problemType, setProblemType] = useState("allDifferent");
  const [useDecimals, setUseDecimals] = useState(false);
  const [decimalPrecision, setDecimalPrecision] = useState("none");
  const [problems, setProblems] = useState([]);

  const handleGenerateWorksheet = () => {
    let generatedProblems = [];
    for (let i = 0; i < numProblems; i++) {
      if (problemType === "allDifferent") {
        generatedProblems.push(generateRandomProblem(minNum, maxNum, numSize));
      } else if (problemType === "paired") {
        const pair = generatePairedProblem(minNum, maxNum, numSize);
        generatedProblems.push(...pair);
      }
    }
    setProblems(generatedProblems);
  };

  // Generate random problem
  const generateRandomProblem = (min, max, size) => {
    let numbers = [];
    for (let i = 0; i < size; i++) {
      let number = Math.random() * (max - min) + min;
      number = applyDecimalPrecision(number); // Apply decimal precision based on user selection
      numbers.push(number);
    }
    const mad = calculateMAD(numbers);
    return { numbers, mad };
  };

  // Apply rounding based on user selection
  const applyDecimalPrecision = (number) => {
    if (!useDecimals) {
      return Math.round(number); // No decimals, round to whole number
    } else if (useDecimals && decimalPrecision === "tenths") {
      return Math.round((number * 10) / 10); // Round to tenths
    } else if (useDecimals && decimalPrecision === "hundredths") {
      return Math.round((number * 100) / 100); // Round to hundredths
    }
    return number; // Default, if no rounding is selected
  };

  // Calculate the mean absolute deviation (MAD)
  const calculateMAD = (numbers) => {
    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    const mad =
      numbers
        .map((num) => Math.abs(num - mean))
        .reduce((sum, deviation) => sum + deviation, 0) / numbers.length;
    return mad.toFixed(2); // Round MAD to 2 decimal places
  };

  // Generate paired problems (example implementation)
  const generatePairedProblem = (min, max, size) => {
    const firstProblem = generateRandomProblem(min, max, size);
    const secondProblem = generateRandomProblem(min, max, size);
    // Here, you could implement logic to ensure both have the same MAD
    return [firstProblem, secondProblem];
  };

  // Generate PDF for problems
  const createPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Mean Absolute Deviation Worksheet", 10, 10);
    problems.forEach((problem, index) => {
      doc.text(
        `Problem ${index + 1}: ${problem.numbers.join(", ")}`,
        10,
        20 + index * 10
      );
      doc.text(`MAD: ${problem.mad}`, 10, 25 + index * 10);
    });
    doc.save("MAD_Worksheet.pdf");
  };

  return (
    <div>
      <h1>Generate Mean Absolute Deviation Worksheet</h1>
      <form>
        <div>
          <label>Min Number:</label>
          <input
            type="number"
            value={minNum}
            onChange={(e) => setMinNum(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Max Number:</label>
          <input
            type="number"
            value={maxNum}
            onChange={(e) => setMaxNum(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Size of Number Set:</label>
          <input
            type="number"
            value={numSize}
            onChange={(e) => setNumSize(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Number of Problems:</label>
          <input
            type="number"
            value={numProblems}
            onChange={(e) => setNumProblems(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Problem Type:</label>
          <select
            value={problemType}
            onChange={(e) => setProblemType(e.target.value)}
          >
            <option value="allDifferent">All Different Problems</option>
            <option value="paired">Paired Problems with Same Answer</option>
          </select>
        </div>
        <div>
          <label>Use Decimals:</label>
          <input
            type="checkbox"
            checked={useDecimals}
            onChange={(e) => setUseDecimals(e.target.checked)}
          />
        </div>
        {useDecimals && (
          <div>
            <label>Decimal Precision:</label>
            <select
              value={decimalPrecision}
              onChange={(e) => setDecimalPrecision(e.target.value)}
            >
              <option value="tenths">Round to Tenths</option>
              <option value="hundredths">Round to Hundredths</option>
            </select>
          </div>
        )}
        <button type="button" onClick={handleGenerateWorksheet}>
          Generate Worksheet
        </button>
      </form>

      {problems.length > 0 && (
        <div>
          <h2>Generated Problems</h2>
          <ul>
            {problems.map((problem, index) => (
              <li key={index}>
                <strong>Problem {index + 1}:</strong>{" "}
                {problem.numbers.join(", ")} <br />
                <strong>MAD:</strong> {problem.mad}
              </li>
            ))}
          </ul>
          <button onClick={createPDF}>Export to PDF</button>
        </div>
      )}
    </div>
  );
};

export default MadWorksheet;
