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
    <section className="grid gap-8 ">
      <Hero />
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <BlogCard
          title="Some big title"
          date={new Date().toString()}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium animi et nostrum magnam corrupti ab velit eveniet. Nostrum placeat ex, dolor enim numquam sunt eos, aut excepturi cupiditate perferendis ut."
          tags={[{ title: "Blog", href: "#" }]}
        />
        <BlogCard
          title="Some big title"
          date={new Date().toString()}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium animi et nostrum magnam corrupti ab velit eveniet. Nostrum placeat ex, dolor enim numquam sunt eos, aut excepturi cupiditate perferendis ut."
          tags={[
            { title: "Blog", href: "#" },
            { title: "Blog", href: "#" },
            { title: "Blog", href: "#" },
            { title: "Blog", href: "#" },
            { title: "Blog", href: "#" },
            { title: "Blog", href: "#" },
          ]}
        />
        <BlogCard
          title="Some big title"
          date={new Date().toString()}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium animi et nostrum magnam corrupti ab velit eveniet. Nostrum placeat ex, dolor enim numquam sunt eos, aut excepturi cupiditate perferendis ut."
          tags={[{ title: "Blog", href: "#" }]}
        />
        <BlogCard
          title="Some big title"
          date={new Date().toString()}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium animi et nostrum magnam corrupti ab velit eveniet. Nostrum placeat ex, dolor enim numquam sunt eos, aut excepturi cupiditate perferendis ut."
          tags={[{ title: "Blog", href: "#" }]}
        />
        <BlogCard
          title="Some big title"
          date={new Date().toString()}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium animi et nostrum magnam corrupti ab velit eveniet. Nostrum placeat ex, dolor enim numquam sunt eos, aut excepturi cupiditate perferendis ut."
          tags={[{ title: "Blog", href: "#" }]}
        />
        <BlogCard
          title="Some big title"
          date={new Date().toString()}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium animi et nostrum magnam corrupti ab velit eveniet. Nostrum placeat ex, dolor enim numquam sunt eos, aut excepturi cupiditate perferendis ut."
          tags={[{ title: "Blog", href: "#" }]}
        />
        <BlogCard
          title="Some big title"
          date={new Date().toString()}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium animi et nostrum magnam corrupti ab velit eveniet. Nostrum placeat ex, dolor enim numquam sunt eos, aut excepturi cupiditate perferendis ut."
          tags={[{ title: "Blog", href: "#" }]}
        />
      </div>
      <About />
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
