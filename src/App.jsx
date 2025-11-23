import { useState } from "react";

import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registration from "./pages/Registration.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Create from "./pages/Create.jsx";
import Edit from "./pages/Edit.jsx";
import SearchPost from "./pages/SearchPost.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/registration" element={<Registration />} />
          <Route path="/blog/dashboard" element={<Dashboard />} />
          <Route path="/blog/create" element={<Create />} />
          <Route path="/blog/post/:id" element="" />
          <Route path="/blog/edit/:id" element={<Edit />} />
          <Route path="/blog/search" element={<SearchPost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
