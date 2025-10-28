import { useState } from "react";

import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registration from "./pages/Registration.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/registration" element={<Registration />} />
          <Route path="/blog/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
