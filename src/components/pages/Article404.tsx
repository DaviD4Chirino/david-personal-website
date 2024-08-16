import Navlinks from "../molecules/Navlinks";

export default function Article404() {
  return (
    <section className="container m-5 mx-auto">
      <Navlinks className="flex gap-1 place-content-end" />
      <h1 className="text-center">
        The article you want to access does not exist
      </h1>
    </section>
  );
}
