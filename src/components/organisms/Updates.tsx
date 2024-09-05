import Articles from "./Articles";
export default function Updates() {
  return (
    <section id="Updates" className="container space-y-10">
      <Articles
        className=" grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3"
        orderBy={"date"}
      />
    </section>
  );
}
