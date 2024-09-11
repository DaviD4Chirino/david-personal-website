import React from "react";
import Hero from "../components/organisms/Hero";
import Updates from "../components/organisms/Updates";
import About from "../components/organisms/About";

export default function page() {
  return (
    <section className="grid gap-16 mb-3">
      <Hero />
      <Updates />
      <About />
    </section>
  );
}
