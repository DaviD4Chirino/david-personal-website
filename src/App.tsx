// import { useEffect, useState } from "react";
// import axios from "axios";
import "./App.css";
import "./fonts.css";
import About from "./components/organisms/About";
import Hero from "./components/organisms/Hero";
import { getGistFile } from "./database";

function App() {
  console.log(getGistFile("library.json"));

  // const [library, setLibrary] = useState();

  /* useEffect(() => {
    async function getting() {
      const res = await getDataFromApi();
      setLibrary(JSON.parse(res.files["library.json"].content)[0]);
    }
    getting();

    return () => {};
  }, []); */

  return (
    <section>
      <Hero />
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
