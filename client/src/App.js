import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SurfaceAreaWorksheet from "./Components/Surface Area/surfaceArea";
import MadWorksheet from "./Components/MAD/mad";
import WorksheetGenerator from "./Components/Graphs/Graphs";
import SurfaceAreaTriangularPrismWorksheet from "./Components/Surface Area/triangularPrisms";
import PythagoreanWorksheet from "./Components/Pythag/Pythag";
import WorksheetGenerator2 from "./Components/Graphs/LargeGraphs";
import WorksheetGenerator3 from "./Components/Graphs/Both";
import StemAndLeafGenerator from "./Components/Data/StemLeaf";
import BoxPlotGenerator from "./Components/Data/Boxplots";
import DotPlotDiagram from "./Components/Data/Dotplots";
import TransformationsGraph from "./Components/Transformations/Transformations";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SA" element={<SurfaceAreaWorksheet />} />
        <Route path="/graphs" element={<WorksheetGenerator />} />
        <Route path="/graphs2" element={<WorksheetGenerator2 />} />
        <Route path="/graphs3" element={<WorksheetGenerator3 />} />
        <Route path="/stemleaf" element={<StemAndLeafGenerator />} />
        <Route path="/boxplot" element={<BoxPlotGenerator />} />
        <Route path="/dotplot" element={<DotPlotDiagram />} />
        <Route path="/tgraphs" element={<TransformationsGraph />} />

        <Route path="/mad" element={<MadWorksheet />} />
        <Route path="/pythag" element={<PythagoreanWorksheet />} />

        <Route
          path="/satri"
          element={<SurfaceAreaTriangularPrismWorksheet />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App; // Ensure this is a default export
