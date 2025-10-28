import { useState } from "react";

import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registration from "./pages/Registration.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/registration" element={<Registration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
