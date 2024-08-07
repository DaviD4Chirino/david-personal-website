import { useParams } from "react-router-dom";

export default function Blog() {
  const { title } = useParams();
  console.log(useParams());

  return <section id="Blog">{title?.replaceAll("_", " ")}</section>;
}
