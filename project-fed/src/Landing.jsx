import { useState, useEffect } from "react";
import "./App.css";
import NewTopList from "./New-top-list";
import HeroSection from "./hero-section.jsx";
import NavSection from "./Nav-section";

function Landing() {
  return (
    <>
      <NavSection />
      <HeroSection />
      <NewTopList />
    </>
  );
}

export default Landing;
