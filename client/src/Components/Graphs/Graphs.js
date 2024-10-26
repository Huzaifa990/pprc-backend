import "./Graphs.css";
import React, { useState } from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function WorksheetGenerator() {
  const [numQuestions, setNumQuestions] = useState(5);
  const [displayMode, setDisplayMode] = useState("both");
  const [worksheetOutput, setWorksheetOutput] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const generateWorksheet = () => {
    const output = [];

    for (let i = 0; i < numQuestions; i++) {
      const slope = randomSlope();
      const intervalX = randomInterval();
      const intervalY = randomInterval();
      const intercept = randomVisibleIntercept(intervalY);

      if (
        displayMode === "tables" ||
        displayMode === "both" ||
        displayMode === "matching"
      ) {
        const table = generateTable(slope, intercept, intervalX);
        output.push(
          <div key={`table-${i}`} id={`table-${i}`}>
            {table}
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, `table-${i}`)}
              />{" "}
              Include this table in worksheet
            </label>
          </div>
        );
      }

      if (
        displayMode === "graphs" ||
        displayMode === "both" ||
        displayMode === "matching"
      ) {
        const graph = generateGraph(slope, intercept, intervalX, intervalY);
        output.push(
          <div key={`graph-${i}`} id={`graph-${i}`}>
            {graph}
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleCheckboxChange(e, `graph-${i}`)}
              />{" "}
              Include this graph in worksheet
            </label>
          </div>
        );
      }
    }

    setWorksheetOutput(output);
  };

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedItems((prevItems) => [...prevItems, id]);
    } else {
      setSelectedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const randomSlope = () => {
    return Math.random() > 2
      ? Math.floor(Math.random() * 5) + 1
      : -1 * (Math.floor(Math.random() * 5) + 1);
  };

  const randomVisibleIntercept = (intervalY) => {
    const visibleIntercepts = [];
    const range = 4 * intervalY;
    for (let i = -range; i <= range; i += intervalY) {
      visibleIntercepts.push(i);
    }
    const randomIndex = Math.floor(Math.random() * visibleIntercepts.length);
    return visibleIntercepts[randomIndex];
  };

  const randomInterval = () => {
    const intervals = [1, 2, 3, 4, 5, 10];
    return intervals[Math.floor(Math.random() * intervals.length)];
  };

  const generateTable = (slope, intercept, intervalX) => {
    const rows = [];
    const usedXValues = new Set();

    while (usedXValues.size < 5) {
      const x = Math.floor(Math.random() * 10) - 5;
      if (!usedXValues.has(x) && x !== 0) {
        usedXValues.add(x);
      }
    }

    [...usedXValues].forEach((x) => {
      const y = slope * x + intercept;
      rows.push(
        <tr key={x}>
          <td style={{ border: "1px solid black", padding: "5px" }}>{x}</td>
          <td style={{ border: "1px solid black", padding: "5px" }}>{y}</td>
        </tr>
      );
    });

    return (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "5px" }}>x</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>y</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  };

  //   const xMin = -5 * intervalX;
  //   const xMax = 5 * intervalX;
  //   const yMin = slope * xMin + intercept;
  //   const yMax = slope * xMax + intercept;

  //   // Data for the line extending fully across the graph
  //   const data = [
  //     { x: xMin, y: yMin },
  //     { x: xMax, y: yMax },
  //   ];

  //   const xDomain = [-5 * intervalX, 5 * intervalX];
  //   const yDomain = [-5 * intervalY, 5 * intervalY];

  //   const xTicks = getTicks(xDomain, intervalX);
  //   const yTicks = getTicks(yDomain, intervalY);

  //   return (
  //     <VictoryChart
  //       domain={{ x: xDomain, y: yDomain }}
  //       height={400}
  //       width={400}
  //     >
  //       <VictoryLine
  //         data={data}
  //         style={{
  //           data: { stroke: "black", strokeWidth: 1.5 },
  //         }}
  //       />
  //       <VictoryAxis
  //         tickValues={xTicks}
  //         style={{
  //           tickLabels: { fontSize: 8, padding: 5 },
  //           grid: { stroke: "lightgray" },
  //           axis: { stroke: "black", strokeWidth: 1.5 },
  //         }}
  //       />
  //       <VictoryAxis
  //         dependentAxis
  //         tickValues={yTicks}
  //         style={{
  //           tickLabels: { fontSize: 8, padding: 5 },
  //           grid: { stroke: "lightgray" },
  //           axis: { stroke: "black", strokeWidth: 1.5 },
  //         }}
  //       />
  //     </VictoryChart>
  //   );
  // };
  const generateGraph = () => {
    const intervalX = randomInterval();  // Random interval for x-axis
    let intervalY = randomInterval();    // Random interval for y-axis
  
    // Ensure intervalY is not the same as intervalX
    while (intervalY === intervalX) {
      intervalY = randomInterval();
    }
  
    // Set a random y-intercept within a visible range
    const intercept = randomVisibleIntercept(intervalY);
  
    // Define rise and run as multiples of the chosen intervals
    const rise = (Math.floor(Math.random() * 4)+1) * intervalY;  // Move 3 intervals up/down (customize as needed)
    const run = (Math.floor(Math.random() * 4)+1) * intervalX;   // Move 2 intervals left/right (customize as needed)
  
    // Calculate the slope as rise/run
    const slope = rise / run;
  
    const xMin = -5 * intervalX;
    const xMax = 5 * intervalX;
    const yMin = slope * xMin + intercept;
    const yMax = slope * xMax + intercept;
  
    // Data for the line extending fully across the graph
    const data = [
      { x: xMin, y: yMin },
      { x: xMax, y: yMax },
    ];
  
    const xDomain = [-5 * intervalX, 5 * intervalX];
    const yDomain = [-5 * intervalY, 5 * intervalY];
  
    const xTicks = getTicks(xDomain, intervalX);
    const yTicks = getTicks(yDomain, intervalY);
  
    return (
      <VictoryChart
        domain={{ x: xDomain, y: yDomain }}
        height={400}
        width={400}
      >
        <VictoryLine
          data={data}
          style={{
            data: { stroke: "black", strokeWidth: 1.5 },
          }}
        />
        <VictoryAxis
          tickValues={xTicks}
          style={{
            tickLabels: { fontSize: 8, padding: 5 },
            grid: { stroke: "lightgray" },
            axis: { stroke: "black", strokeWidth: 1.5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickValues={yTicks}
          style={{
            tickLabels: { fontSize: 8, padding: 5 },
            grid: { stroke: "lightgray" },
            axis: { stroke: "black", strokeWidth: 1.5 },
          }}
        />
      </VictoryChart>
    );
  };
  
  const getTicks = (domain, interval) => {
    const ticks = [];
    for (let i = domain[0]; i <= domain[1]; i += interval) {
      ticks.push(i);
    }
    return ticks;
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    let yOffset = 10;
    let xOffset = 10;
    const columnWidth = 90;
    const rowHeight = 100;
    const itemsPerRow = 2;

    for (const [index, elementId] of selectedItems.entries()) {
      const element = document.getElementById(elementId);
      if (element) {
        const canvas = await html2canvas(element, { useCORS: true });
        const imgData = canvas.toDataURL("image/png");

        doc.addImage(imgData, "PNG", xOffset, yOffset, columnWidth, rowHeight);

        if ((index + 1) % itemsPerRow === 0) {
          yOffset += rowHeight;
          xOffset = 10;
        } else {
          xOffset += columnWidth + 10;
        }
      }
    }

    doc.save("worksheet.pdf");
  };

  return (
    <div>
      <form>
        <label>
          Number of questions:
          <input
            type="number"
            min="1"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          />
        </label>
        <br />

        <label>
          Display:
          <select
            value={displayMode}
            onChange={(e) => setDisplayMode(e.target.value)}
          >
            <option value="both">Both Tables and Graphs</option>
            <option value="tables">Tables Only</option>
            <option value="graphs">Graphs Only</option>
            <option value="matching">Matching Tables and Graphs</option>
          </select>
        </label>
        <br />
        <button type="button" onClick={generateWorksheet}>
          Generate Worksheet
        </button>
        <button type="button" onClick={generatePDF}>
          Download PDF
        </button>
      </form>
      <div>{worksheetOutput}</div>
    </div>
  );
}

export default WorksheetGenerator;
