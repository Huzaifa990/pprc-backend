import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

// Function to generate skewed data points
const generateSkewedData = (ticks, skewType, count) => {
  const data = [];

  for (let i = 0; i < count; i++) {
    let value;
    switch (skewType) {
      case "normal":
        value = Math.round(
          d3.randomNormal(d3.mean(ticks), d3.deviation(ticks))()
        );
        break;
      case "left-skewed":
        value = Math.round(
          d3.randomBeta(1, 3)() * (ticks[ticks.length - 1] - ticks[0]) +
            ticks[0]
        );
        break;
      case "right-skewed":
        value = Math.round(
          d3.randomBeta(3, 1)() * (ticks[ticks.length - 1] - ticks[0]) +
            ticks[0]
        );
        break;
      default:
        value = ticks[Math.floor(Math.random() * ticks.length)];
    }
    if (ticks.includes(value)) {
      data.push(value);
    } else {
      i--;
    }
  }

  return data;
};

const DotPlotDiagram = () => {
  const [numberOfProblems, setNumberOfProblems] = useState(1);
  const [dotPlots, setDotPlots] = useState([]);
  const svgRef = useRef();

  const generateDotPlots = () => {
    const plots = [];
    const skewTypes = ["normal", "left-skewed", "right-skewed"];

    for (let i = 0; i < numberOfProblems; i++) {
      const minValue = Math.floor(Math.random() * 10);
      const maxValue = minValue + Math.floor(Math.random() * 20) + 10;

      const tickCount = Math.floor(Math.random() * 5) + 8;
      const interval = Math.ceil((maxValue - minValue) / tickCount);
      const ticks = d3.range(minValue, maxValue + 1, interval);

      const skewType = skewTypes[Math.floor(Math.random() * skewTypes.length)];
      const dataPoints = generateSkewedData(
        ticks,
        skewType,
        Math.floor(Math.random() * 16) + 15
      );
      plots.push({ dataPoints, minValue, maxValue, ticks });
    }
    setDotPlots(plots);
  };

  useEffect(() => {
    if (dotPlots.length > 0) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      dotPlots.forEach((plot, index) => {
        const { dataPoints, minValue, maxValue, ticks } = plot;
        const margin = { top: 40, right: 20, bottom: 30, left: 20 };
        const width = 500 - margin.left - margin.right;
        const height = 100 - margin.top - margin.bottom;

        const xScale = d3
          .scaleLinear()
          .domain([minValue, maxValue])
          .range([0, width]);

        const g = svg
          .append("g")
          .attr(
            "transform",
            `translate(${margin.left}, ${margin.top + index * (height + 100)})`
          );

        g.append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", width)
          .attr("y2", 0)
          .attr("stroke", "black");

        ticks.forEach((tick) => {
          g.append("line")
            .attr("x1", xScale(tick))
            .attr("y1", -5)
            .attr("x2", xScale(tick))
            .attr("y2", 5)
            .attr("stroke", "black");

          g.append("text")
            .attr("x", xScale(tick))
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .text(tick);
        });

        const dotGroups = d3.groups(dataPoints, (d) => d);
        dotGroups.forEach(([value, points]) => {
          points.forEach((_, idx) => {
            g.append("circle")
              .attr("class", "dot")
              .attr("cx", xScale(value))
              .attr("cy", -10 - idx * 10)
              .attr("r", 5)
              .attr("fill", "blue");
          });
        });
      });
    }
  }, [dotPlots]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Dot Plot Diagrams</h1>
      <label>
        Select number of problems:
        <input
          type="number"
          min="1"
          value={numberOfProblems}
          onChange={(e) => setNumberOfProblems(Number(e.target.value))}
        />
      </label>
      <button onClick={generateDotPlots}>Generate Dot Plots</button>
      <svg
        ref={svgRef}
        width="500"
        height={numberOfProblems * 200} // Dynamic height based on the number of problems
        style={{ marginTop: "20px", overflowY: "scroll" }}
      />
    </div>
  );
};

export default DotPlotDiagram;
