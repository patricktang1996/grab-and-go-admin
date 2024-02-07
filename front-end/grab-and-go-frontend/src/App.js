import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.css';
import './css/generatePDF.css'
import './css/pdfEditForm.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./page/HomePage";
import GeneratePDFPop from "../src/popupDiagram/GeneratePDFPop";


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/*" element={<HomePage />} />
              <Route path="/generate-pdf" element={<GeneratePDFPop />} />
          </Routes>
      </Router>
  );
}

export default App;
