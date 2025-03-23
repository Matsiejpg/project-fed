import { useState, useEffect } from "react";
import "./App.css";
import NewTopList from "./New-top-list";
import NavSection from "./Nav-section";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import CoinDetails from "./CoinDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
