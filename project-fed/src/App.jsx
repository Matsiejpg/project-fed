import { useState, useEffect } from "react";
import "./App.css";
import NewTopList from "./New-top-list";
import HeroSection from "./hero-section";
import NavSection from "./Nav-section";

function App() {
  return (
    <>
      <NavSection />
      <HeroSection />
      <NewTopList />
    </>
  );
}

export default App;
