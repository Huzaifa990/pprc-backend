import "./Graphs.css";
import React, { useState } from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function WorksheetGenerator3() {
  const [numQuestions, setNumQuestions] = useState(5);
  const [displayMode, setDisplayMode] = useState("both");
  const [valueRange, setValueRange] = useState("less"); // "less" or "more"
  const [worksheetOutput, setWorksheetOutput] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // Functions for less values (from WorksheetGenerator.js)
  const generateWorksheetLess = () => {
    const output = [];

    for (let i = 0; i < numQuestions; i++) {
      const slope = randomSlopeLess();
      const intervalX = randomIntervalLess();
      const intervalY = randomIntervalLess();
      const intercept = randomVisibleInterceptLess(intervalY);

      if (displayMode === "tables" || displayMode === "both") {
        const table = generateTableLess(slope, intercept, intervalX);
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

      if (displayMode === "graphs" || displayMode === "both") {
        const graph = generateGraphLess();
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

  // Functions for more values (from WorksheetGenerator2.js)
  const generateWorksheetMore = () => {
    const output = [];

    for (let i = 0; i < numQuestions; i++) {
      const slope = randomSlopeMore();
      const intervalX = randomIntervalMore();
      const intervalY = randomIntervalMore();
      const intercept = randomVisibleInterceptMore(intervalY);

      if (displayMode === "tables" || displayMode === "both") {
        const table = generateTableMore(slope, intercept, intervalX);
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

      if (displayMode === "graphs" || displayMode === "both") {
        const graph = generateGraphMore();
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

  // Original functions from WorksheetGenerator.js (less values)
  const randomSlopeLess = () => {
    const slope = Math.floor(Math.random() * 5) + 1;
    return Math.random() < 0.5 ? slope : -slope;
  };

  const randomVisibleInterceptLess = (intervalY) => {
    const visibleIntercepts = [];
    const range = 4 * intervalY;
    for (let i = -range; i <= range; i += intervalY) {
      visibleIntercepts.push(i);
    }
    const randomIndex = Math.floor(Math.random() * visibleIntercepts.length);
    return visibleIntercepts[randomIndex];
  };

  const randomIntervalLess = () => {
    const intervals = [1, 2, 3, 4, 5, 10];
    return intervals[Math.floor(Math.random() * intervals.length)];
  };

  const generateTableLess = (slope, intercept, intervalX) => {
    const rows = [];
    let usedXValues = new Set();

    while (usedXValues.size < 5) {
      const x = Math.floor(Math.random() * 10) - 5;
      if (!usedXValues.has(x) && x !== 0) {
        usedXValues.add(x);
      }
    }
    usedXValues = Array.from(usedXValues).sort((a, b) => a - b);
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

  const generateGraphLess = () => {
    const intervalX = randomIntervalLess();
    let intervalY = randomIntervalLess();

    while (intervalY === intervalX) {
      intervalY = randomIntervalLess();
    }

    const intercept = randomVisibleInterceptLess(intervalY);

    const rise = (Math.floor(Math.random() * 4) + 1) * intervalY;
    const run = (Math.floor(Math.random() * 4) + 1) * intervalX;
    const slope = Math.random() < 0.5 ? rise / run : -rise / run;

    const xMin = -5 * intervalX;
    const xMax = 5 * intervalX;
    const yMin = slope * xMin + intercept;
    const yMax = slope * xMax + intercept;

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

  // Original functions from WorksheetGenerator2.js (more values)
  const randomSlopeMore = () => {
    const slope = Math.floor(Math.random() * 5) + 1;
    return Math.random() < 0.5 ? slope : -slope;
  };

  const randomVisibleInterceptMore = (intervalY) => {
    const visibleIntercepts = [];
    const range = 9 * intervalY;
    for (let i = -range; i <= range; i += intervalY) {
      visibleIntercepts.push(i);
    }
    const randomIndex = Math.floor(Math.random() * visibleIntercepts.length);
    return visibleIntercepts[randomIndex];
  };

  const randomIntervalMore = () => {
    const intervals = [1, 2, 3, 4, 5, 10];
    return intervals[Math.floor(Math.random() * intervals.length)];
  };

  const generateTableMore = (slope, intercept, intervalX) => {
    const rows = [];
    let usedXValues = new Set();

    while (usedXValues.size < 10) {
      const x = Math.floor(Math.random() * 30) - 15; // Range from -15 to 15
      if (!usedXValues.has(x) && x !== 0) {
        usedXValues.add(x);
      }
    }

    usedXValues = Array.from(usedXValues).sort((a, b) => a - b);

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

  const generateGraphMore = () => {
    const intervalX = randomIntervalMore();
    let intervalY = randomIntervalMore();

    while (intervalY === intervalX) {
      intervalY = randomIntervalMore();
    }

    const intercept = randomVisibleInterceptMore(intervalY);

    const rise = (Math.floor(Math.random() * 9) + 1) * intervalY;
    const run = (Math.floor(Math.random() * 9) + 1) * intervalX;
    const slope = Math.random() < 0.5 ? rise / run : -rise / run;

    const xMin = -10 * intervalX;
    const xMax = 10 * intervalX;
    const yMin = slope * xMin + intercept;
    const yMax = slope * xMax + intercept;

    const data = [
      { x: xMin, y: yMin },
      { x: xMax, y: yMax },
    ];

    const xDomain = [-10 * intervalX, 10 * intervalX];
    const yDomain = [-10 * intervalY, 10 * intervalY];

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

  // Shared functions
  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedItems((prevItems) => [...prevItems, id]);
    } else {
      setSelectedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
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
    const rowHeight = 30;
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
          </select>
        </label>
        <br />

        <label>
          Values Range:
          <select
            value={valueRange}
            onChange={(e) => setValueRange(e.target.value)}
          >
            <option value="less">Less Values (5x5)</option>
            <option value="more">More Values (10x10)</option>
          </select>
        </label>
        <br />

        <button
          type="button"
          onClick={() =>
            valueRange === "less"
              ? generateWorksheetLess()
              : generateWorksheetMore()
          }
        >
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

export default WorksheetGenerator3;
