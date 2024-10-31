import React, { useState } from "react";

const StemAndLeafGenerator = () => {
  const [numProblems, setNumProblems] = useState(1);
  const [problems, setProblems] = useState([]);

  const generateData = () => {
    let newProblems = [];
    for (let i = 0; i < numProblems; i++) {
      const dataSet = Array.from(
        { length: Math.floor(Math.random() * 10) + 5 },
        () => Math.floor(Math.random() * 90) + 10 // Generates numbers between 10 and 99
      ).sort((a, b) => a - b);

      const stems = {};
      dataSet.forEach((num) => {
        const stem = Math.floor(num / 10);
        const leaf = num % 10;
        if (!stems[stem]) {
          stems[stem] = [];
        }
        stems[stem].push(leaf);
      });

      newProblems.push({ dataSet, stems });
    }
    setProblems(newProblems);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Stem-and-Leaf Plot Generator</h2>
      <label>
        Number of Problems:
        <input
          type="number"
          value={numProblems}
          min="1"
          onChange={(e) => setNumProblems(parseInt(e.target.value))}
          style={{ marginLeft: "10px", width: "50px" }}
        />
      </label>
      <button onClick={generateData} style={{ marginLeft: "15px" }}>
        Generate Plots
      </button>

      <div style={{ marginTop: "20px" }}>
        {problems.map((problem, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h3>Problem {index + 1}</h3>
            <p>Data Set: {problem.dataSet.join(", ")}</p>
            <div>
              <strong>Stem-and-Leaf Plot:</strong>
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  padding: "10px",
                  maxWidth: "300px",
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ccc",
                }}
              >
                <div
                  style={{
                    marginLeft: "20px",
                    paddingLeft: "10px",
                  }}
                >
                  {Object.entries(problem.stems).map(([stem, leaves]) => (
                    <div
                      key={stem}
                      style={{
                        display: "flex",
                        fontFamily: "monospace",
                        margin: "2px 0",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          width: "30px",
                          textAlign: "right",
                        }}
                      >
                        {stem}
                      </span>
                      <span style={{ marginLeft: "20px" }}>
                        {" "}
                        {/* Increased marginLeft for leaves */}
                        {leaves.join(" ")}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Continuous vertical line for all stems */}
                <div
                  style={{
                    position: "absolute",
                    left: "80px", // Adjusted to be after the stems
                    top: "0",
                    bottom: "0",
                    width: "1px",
                    backgroundColor: "black",
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StemAndLeafGenerator;
