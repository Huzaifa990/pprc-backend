import React, { useState } from "react";
import { quantile } from "d3-array";
import * as d3 from "d3";

const BoxPlotGenerator = () => {
  const [numProblems, setNumProblems] = useState(1);
  const [boxPlotData, setBoxPlotData] = useState([]);

  const generateData = () => {
    const data = [];
    for (let i = 0; i < numProblems; i++) {
      const randomData = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 100)
      );
      const sortedData = randomData.sort((a, b) => a - b);
      const q1 = quantile(sortedData, 0.25);
      const median = quantile(sortedData, 0.5);
      const q3 = quantile(sortedData, 0.75);
      const min = sortedData[0];
      const max = sortedData[sortedData.length - 1];

      data.push({ min, q1, median, q3, max });
    }
    setBoxPlotData(data);
  };

  const handleNumProblemsChange = (e) => {
    setNumProblems(e.target.value);
  };

  return (
    <div>
      <h2>Box Plot Generator</h2>
      <label>
        Number of problems:
        <input
          type="number"
          min="1"
          value={numProblems}
          onChange={handleNumProblemsChange}
        />
      </label>
      <button onClick={generateData}>Generate Box Plots</button>

      <div className="box-plots">
        {boxPlotData.map((box, index) => {
          const width = 300;
          const dataRange = box.max - box.min;

          // Expanded set of interval options including non-traditional values like 7, 8, 15
          const intervalOptions = [1, 2, 5, 7, 8, 9, 10, 15, 20, 25, 30, 50];
          const targetTickCount = 8; // Target approximately 8 intervals
          const roughInterval = dataRange / targetTickCount;

          // Select the smallest interval option that provides a manageable number of ticks
          const tickInterval =
            intervalOptions.find((interval) => dataRange / interval <= 10) ||
            10;

          // Expand scale domain to go beyond the min and max
          const scaleMin =
            Math.floor(box.min / tickInterval) * tickInterval - tickInterval;
          const scaleMax =
            Math.ceil(box.max / tickInterval) * tickInterval + tickInterval;

          const scale = d3
            .scaleLinear()
            .domain([scaleMin, scaleMax])
            .range([50, width - 50]);

          // Snap each box plot value (min, Q1, median, Q3, max) to the nearest tick mark
          const snapToTick = (value) =>
            Math.round(value / tickInterval) * tickInterval;

          const snappedMin = snapToTick(box.min);
          const snappedQ1 = snapToTick(box.q1);
          const snappedMedian = snapToTick(box.median);
          const snappedQ3 = snapToTick(box.q3);
          const snappedMax = snapToTick(box.max);

          return (
            <svg
              key={index}
              width={width}
              height="100"
              style={{ margin: "20px 0" }}
            >
              {/* Number line */}
              <line
                x1="50"
                x2={width - 50}
                y1="70"
                y2="70"
                stroke="lightgray"
                strokeWidth="2"
              />

              {/* Dynamic tick marks based on calculated tick interval */}
              {d3
                .range(scaleMin, scaleMax + tickInterval, tickInterval)
                .map((tick) => (
                  <g key={tick}>
                    <line
                      x1={scale(tick)}
                      x2={scale(tick)}
                      y1="65"
                      y2="75"
                      stroke="gray"
                    />
                    <text
                      x={scale(tick)}
                      y="85"
                      textAnchor="middle"
                      fontSize="10"
                    >
                      {tick}
                    </text>
                  </g>
                ))}

              {/* Draw whiskers aligned with snapped ticks */}
              <line
                x1={scale(snappedMin)}
                y1="30"
                x2={scale(snappedMin)}
                y2="50"
                stroke="black"
                strokeWidth="2"
              />
              <line
                x1={scale(snappedMax)}
                y1="30"
                x2={scale(snappedMax)}
                y2="50"
                stroke="black"
                strokeWidth="2"
              />

              {/* Draw horizontal lines connecting min to Q1 and Q3 to max */}
              <line
                x1={scale(snappedMin)}
                y1="40"
                x2={scale(snappedQ1)}
                y2="40"
                stroke="black"
                strokeWidth="2"
              />
              <line
                x1={scale(snappedQ3)}
                y1="40"
                x2={scale(snappedMax)}
                y2="40"
                stroke="black"
                strokeWidth="2"
              />

              {/* Draw box aligned with snapped ticks */}
              <rect
                x={scale(snappedQ1)}
                y="30"
                width={scale(snappedQ3) - scale(snappedQ1)}
                height="20"
                fill="lightblue"
                stroke="black"
                strokeWidth="2"
              />

              {/* Draw median line aligned with snapped ticks */}
              <line
                x1={scale(snappedMedian)}
                y1="30"
                x2={scale(snappedMedian)}
                y2="50"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

export default BoxPlotGenerator;
