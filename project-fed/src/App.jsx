import { useState, useEffect } from "react";
import "./App.css";
import NewTopList from "./New-top-list";
import HeroSection from "./hero-section";
import NavSection from "./Nav-section";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/coin/:id" element={<NewTopList />} />
      </Routes>
    </Router>
  );
}

export default App;
