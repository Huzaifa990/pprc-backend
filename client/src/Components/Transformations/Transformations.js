import React, { useState, useLayoutEffect, useCallback } from "react";
import * as d3 from "d3";

const TransformationsGraph = () => {
  const [numProblems, setNumProblems] = useState(1);
  const [problems, setProblems] = useState([]);

  const friendlyScaleFactors = [0.5, 0.75, 1, 1.5, 2];

  const generateQuadrilateral = () => [
    {
      x: Math.floor(Math.random() * 4 + 1),
      y: Math.floor(Math.random() * 4 + 1),
    },
    {
      x: Math.floor(Math.random() * 4 + 1),
      y: Math.floor(Math.random() * -4 - 1),
    },
    {
      x: Math.floor(Math.random() * -4 - 1),
      y: Math.floor(Math.random() * -4 - 1),
    },
    {
      x: Math.floor(Math.random() * -4 - 1),
      y: Math.floor(Math.random() * 4 + 1),
    },
  ];

  const generateTriangle = () => {
    const vertices = [];
    const minDistance = 2; // Minimum distance between vertices

    while (vertices.length < 3) {
      const newVertex = {
        x: Math.floor(Math.random() * 4 + 1) * (Math.random() < 0.5 ? 1 : -1),
        y: Math.floor(Math.random() * 4 + 1) * (Math.random() < 0.5 ? 1 : -1),
      };

      // Check if the new vertex is sufficiently far from existing vertices
      const isFarEnough = vertices.every(
        (vertex) =>
          Math.hypot(newVertex.x - vertex.x, newVertex.y - vertex.y) >=
          minDistance
      );

      if (isFarEnough) {
        vertices.push(newVertex);
      }
    }

    return vertices;
  };

  const generateCircle = () => {
    const radius = Math.floor(Math.random() * 2 + 2); // Radius between 2 and 4
    return {
      center: {
        x: Math.floor(Math.random() * 4) * (Math.random() < 0.5 ? 1 : -1),
        y: Math.floor(Math.random() * 4) * (Math.random() < 0.5 ? 1 : -1),
      },
      radius: radius,
    };
  };

  // Corrected applyDilation function to apply scaling to both x and y
  const applyDilation = (shape, scaleFactor) => {
    if (Array.isArray(shape)) {
      return shape.map((point) => ({
        x: Math.round(point.x * scaleFactor * 10) / 10,
        y: Math.round(point.y * scaleFactor * 10) / 10,
      }));
    } else {
      const newRadius = Math.round(shape.radius * scaleFactor);
      return {
        ...shape,
        radius: newRadius,
      };
    }
  };

  const generateProblems = () => {
    const shapes = ["triangle", "quadrilateral", "circle"];
    const newProblems = Array.from({ length: numProblems }, () => {
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const scaleFactor =
        friendlyScaleFactors[
          Math.floor(Math.random() * friendlyScaleFactors.length)
        ];
      let shape, transformed;

      if (shapeType === "triangle") {
        shape = generateTriangle();
        transformed = applyDilation(shape, scaleFactor);
      } else if (shapeType === "circle") {
        shape = generateCircle();
        transformed = applyDilation(shape, scaleFactor);
      } else {
        shape = generateQuadrilateral();
        transformed = applyDilation(shape, scaleFactor);
      }

      // Ensure one vertex of the triangle has whole-number coordinates in both preimage and transformed image
      if (shapeType === "triangle") {
        shape[0] = { x: Math.round(shape[0].x), y: Math.round(shape[0].y) };
        transformed[0] = {
          x: Math.round(transformed[0].x),
          y: Math.round(transformed[0].y),
        };
      }

      return {
        original: shape,
        transformed: transformed,
        type: shapeType,
        scaleFactor: scaleFactor.toFixed(2),
      };
    });
    setProblems(newProblems);
  };

  const handleInputChange = (event) => {
    setNumProblems(Number(event.target.value));
  };

  //   const drawGraph = useCallback((problem, i) => {
  //     const svg = d3
  //       .select(`#graph-${i}`)
  //       .attr("width", 500)
  //       .attr("height", 500)
  //       .style("border", "1px solid black");

  //     const xScale = d3.scaleLinear().domain([-10, 10]).range([0, 500]);
  //     const yScale = d3.scaleLinear().domain([-10, 10]).range([500, 0]);

  //     // Clear previous content
  //     svg.selectAll("*").remove();

  //     // Draw grid and axes first
  //     const drawGridAndAxes = () => {
  //       for (let x = -10; x <= 10; x++) {
  //         svg
  //           .append("line")
  //           .attr("x1", xScale(x))
  //           .attr("x2", xScale(x))
  //           .attr("y1", yScale(-10))
  //           .attr("y2", yScale(10))
  //           .attr("stroke", "#ddd")
  //           .attr("stroke-width", 0.5);
  //       }
  //       for (let y = -10; y <= 10; y++) {
  //         svg
  //           .append("line")
  //           .attr("x1", xScale(-10))
  //           .attr("x2", xScale(10))
  //           .attr("y1", yScale(y))
  //           .attr("y2", yScale(y))
  //           .attr("stroke", "#ddd")
  //           .attr("stroke-width", 0.5);
  //       }

  //       // X-axis
  //       svg
  //         .append("line")
  //         .attr("x1", xScale(-10))
  //         .attr("x2", xScale(10))
  //         .attr("y1", yScale(0))
  //         .attr("y2", yScale(0))
  //         .attr("stroke", "black")
  //         .attr("stroke-width", 1);

  //       // Y-axis
  //       svg
  //         .append("line")
  //         .attr("x1", xScale(0))
  //         .attr("x2", xScale(0))
  //         .attr("y1", yScale(-10))
  //         .attr("y2", yScale(10))
  //         .attr("stroke", "black")
  //         .attr("stroke-width", 1);
  //     };

  //     drawGridAndAxes();

  //     // Add axis labels
  //     const addAxisLabels = () => {
  //       for (let x = -10; x <= 10; x++) {
  //         if (x !== 0) {
  //           svg
  //             .append("text")
  //             .attr("x", xScale(x))
  //             .attr("y", yScale(0) + 15)
  //             .attr("text-anchor", "middle")
  //             .attr("font-size", "10px")
  //             .text(x);
  //         }
  //       }
  //       for (let y = -10; y <= 10; y++) {
  //         if (y !== 0) {
  //           svg
  //             .append("text")
  //             .attr("x", xScale(0) - 15)
  //             .attr("y", yScale(y) + 5)
  //             .attr("text-anchor", "middle")
  //             .attr("font-size", "10px")
  //             .text(y);
  //         }
  //       }
  //     };

  //     addAxisLabels();

  //     const drawQuadrilateral = (points, color, labelSuffix) => {
  //       svg
  //         .append("polygon")
  //         .data([points])
  //         .attr("points", (d) =>
  //           d.map((p) => `${xScale(p.x)},${yScale(p.y)}`).join(" ")
  //         )
  //         .attr("fill", "none")
  //         .attr("stroke", color)
  //         .attr("stroke-width", 2);

  //       points.forEach((point, idx) => {
  //         svg
  //           .append("text")
  //           .attr("x", xScale(point.x))
  //           .attr("y", yScale(point.y) - 5)
  //           .attr("fill", color)
  //           .attr("font-size", "12px")
  //           .text(`${String.fromCharCode(80 + idx)}${labelSuffix}`);
  //       });
  //     };

  //     const drawCircle = (circle, color, labelSuffix) => {
  //       svg
  //         .append("circle")
  //         .attr("cx", xScale(circle.center.x))
  //         .attr("cy", yScale(circle.center.y))
  //         .attr("r", circle.radius * (500 / 20))
  //         .attr("fill", "none")
  //         .attr("stroke", color)
  //         .attr("stroke-width", 2);

  //       svg
  //         .append("text")
  //         .attr("x", xScale(circle.center.x))
  //         .attr("y", yScale(circle.center.y) - circle.radius * (500 / 20) - 5)
  //         .attr("fill", color)
  //         .attr("font-size", "12px")
  //         .text(`Center${labelSuffix}`);
  //     };

  //     if (problem.type === "triangle" || problem.type === "quadrilateral") {
  //       drawQuadrilateral(problem.original, "blue", "");
  //       drawQuadrilateral(problem.transformed, "red", "'");
  //     } else if (problem.type === "circle") {
  //       drawCircle(problem.original, "blue", "");
  //       drawCircle(problem.transformed, "red", "'");
  //     }
  //   }, []);

  const drawGraph = useCallback((problem, i) => {
    const svg = d3
      .select(`#graph-${i}`)
      .attr("width", 500)
      .attr("height", 500)
      .style("border", "1px solid black");

    const xScale = d3.scaleLinear().domain([-10, 10]).range([0, 500]);
    const yScale = d3.scaleLinear().domain([-10, 10]).range([500, 0]);

    // Clear previous content
    svg.selectAll("*").remove();

    // Draw grid and axes
    const drawGridAndAxes = () => {
      for (let x = -10; x <= 10; x++) {
        svg
          .append("line")
          .attr("x1", xScale(x))
          .attr("x2", xScale(x))
          .attr("y1", yScale(-10))
          .attr("y2", yScale(10))
          .attr("stroke", "#ddd")
          .attr("stroke-width", 0.5);
      }
      for (let y = -10; y <= 10; y++) {
        svg
          .append("line")
          .attr("x1", xScale(-10))
          .attr("x2", xScale(10))
          .attr("y1", yScale(y))
          .attr("y2", yScale(y))
          .attr("stroke", "#ddd")
          .attr("stroke-width", 0.5);
      }

      // X-axis
      svg
        .append("line")
        .attr("x1", xScale(-10))
        .attr("x2", xScale(10))
        .attr("y1", yScale(0))
        .attr("y2", yScale(0))
        .attr("stroke", "black")
        .attr("stroke-width", 1);

      // Y-axis
      svg
        .append("line")
        .attr("x1", xScale(0))
        .attr("x2", xScale(0))
        .attr("y1", yScale(-10))
        .attr("y2", yScale(10))
        .attr("stroke", "black")
        .attr("stroke-width", 1);
    };

    const addAxisLabels = () => {
      for (let x = -10; x <= 10; x++) {
        if (x !== 0) {
          svg
            .append("text")
            .attr("x", xScale(x))
            .attr("y", yScale(0) + 15)
            .attr("text-anchor", "middle")
            .attr("font-size", "10px")
            .text(x);
        }
      }
      for (let y = -10; y <= 10; y++) {
        if (y !== 0) {
          svg
            .append("text")
            .attr("x", xScale(0) - 15)
            .attr("y", yScale(y) + 5)
            .attr("text-anchor", "middle")
            .attr("font-size", "10px")
            .text(y);
        }
      }
    };

    drawGridAndAxes();
    addAxisLabels();

    const drawShape = (points, color) => {
      if (Array.isArray(points)) {
        svg
          .append("polygon")
          .data([points])
          .attr("points", (d) =>
            d.map((p) => `${xScale(p.x)},${yScale(p.y)}`).join(" ")
          )
          .attr("fill", "none")
          .attr("stroke", color)
          .attr("stroke-width", 2);
      } else {
        svg
          .append("circle")
          .attr("cx", xScale(points.center.x))
          .attr("cy", yScale(points.center.y))
          .attr("r", points.radius * (500 / 20))
          .attr("fill", "none")
          .attr("stroke", color)
          .attr("stroke-width", 2);
      }
    };

    // Draw shapes
    console.log("Original Shape:", problem.original);
    console.log("Transformed Shape:", problem.transformed);

    drawShape(problem.original, "blue"); // Draw original shape
    drawShape(problem.transformed, "red"); // Draw transformed shape
  }, []);

  useLayoutEffect(() => {
    problems.forEach((problem, i) => {
      drawGraph(problem, i);
    });
  }, [problems, drawGraph]);

  return (
    <div>
      <h2>Transformation Graphs: Dilations</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>Number of Problems: </label>
        <input
          type="number"
          value={numProblems}
          onChange={handleInputChange}
          min="1"
          style={{ width: "50px", marginRight: "10px" }}
        />
        <button onClick={generateProblems}>Generate Problems</button>
      </div>
      {problems.map((problem, i) => (
        <div key={i} style={{ marginBottom: "20px" }}>
          <h3>
            Problem {i + 1}: {problem.type} with Scale Factor{" "}
            {problem.scaleFactor}
          </h3>
          <svg id={`graph-${i}`}></svg>
        </div>
      ))}
    </div>
  );
};

export default TransformationsGraph;
