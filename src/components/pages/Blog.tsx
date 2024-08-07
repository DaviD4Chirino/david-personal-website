import Tag from "../atoms/Tag";
import BlogCard from "../molecules/BlogCard";

export default function Blog() {
  return (
    <section id="Blog" className="relative isolate">
      <header
        className="
      isolate relative
      h-44
      "
      >
        <div
          className="
        container 
        grid content-center
        h-full"
        >
          <h1>Blogs</h1>
        </div>
      </header>
      <section
        className="
      container
      grid-rows-none md:grid-rows-[.5fr_1fr] 
      grid grid-cols-1 md:grid-cols-[.5fr_1fr] 
      gap-16
      "
      >
        <div
          id="search"
          className="
        grid grid-rows-[auto_auto] h-max gap-5
        align-middle
        outline outline-1 rounded-sm p-4"
        >
          <div className="grid grid-rows-[auto_1fr] gap-2 h-max">
            <label htmlFor="first_name" className="block ">
              Filter Options
            </label>
            <input
              type="text"
              id="first_name"
              className="
              rounded-full 
              p-2
              outline
              outline-2
              outline-offset-0
              outline-secondary
              hover:outline-offset-2
              focus:outline-offset-4
              transition-all
              "
              placeholder="Search..."
            />
          </div>
          <div id="Tags" className="flex flex-wrap gap-1">
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
            <Tag title="A tag" href="#" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-12">
          {new Array(10).fill("").map((_el, i) => (
            <BlogCard
              title="The Man Who Sold the World"
              tags=""
              date={"10/10/24"}
              description={
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima sunt corporis itaque suscipit illo "
              }
              category={"article"}
              key={i}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
