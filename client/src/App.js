import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SurfaceAreaWorksheet from "./Components/Surface Area/surfaceArea";
import MadWorksheet from "./Components/MAD/mad";
import WorksheetGenerator from "./Components/Graphs/Graphs";
import SurfaceAreaTriangularPrismWorksheet from "./Components/Surface Area/triangularPrisms";
import PythagoreanWorksheet from "./Components/Pythag/Pythag";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SA" element={<SurfaceAreaWorksheet />} />
        <Route path="/graphs" element={<WorksheetGenerator />} />
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
