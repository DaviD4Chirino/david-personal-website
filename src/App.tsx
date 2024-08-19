// import { useEffect, useState } from "react";
// import axios from "axios";
import "./App.css";
import "./fonts.css";
import About from "./components/organisms/About";
import Hero from "./components/organisms/Hero";
import Updates from "./components/organisms/Updates";

function App() {
  return (
    <section className="grid gap-16 mb-3">
      <Hero />
      <Updates />
      <About />
    </section>
  );
}

export default App;
