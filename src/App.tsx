// import { useEffect, useState } from "react";
// import axios from "axios";
import "./App.css";
import "./fonts.css";
import About from "./components/organisms/About";
import Hero from "./components/organisms/Hero";
import { getGistFile } from "./database";
import Updates from "./components/organisms/Updates";
import BlogCard from "./components/molecules/BlogCard";

function App() {
  console.log(getGistFile("library.json"));

  return (
    <section className="grid gap-8">
      <Hero />
      <About />
      <Updates />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </section>
  );
}

export default App;

// async function getDataFromApi() {
//   const res = await axios
//     .get("https://api.github.com/gists/63162440f99c217310eb27ae5b2fb427")
//     .then((res) => res)
//     .catch((err) => err);

//   /*  const head = new Headers();
//   head.append("Access-Control-Allow-Origin", "*");
//   const res: Response = await fetch({
//     url: "https://facebook.github.io/react-native/movies.json",
//     headers: head,
//   }).catch((err) => err);

//   console.log(res.data); */

//   return res.data;
// }
