import BlogCard from "../molecules/BlogCard";

export default function Updates() {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {/* {new Date().getTime()} */}
      <BlogCard
        title="The man who sold the world"
        description="One upon a time a man sold the entire world"
        date={new Date().toDateString()}
        type="personal"
        tags={[{ title: "Article", href: "#" }]}
      />
      <BlogCard
        title="The man who sold the world"
        description="One upon a time a man sold the entire world"
        date={new Date().toDateString()}
        type="game-development"
        tags={[{ title: "Article", href: "#" }]}
      />
      <BlogCard
        title="The man who sold the world"
        description="One upon a time a man sold the entire world"
        date={new Date().toDateString()}
        type="article"
        tags={[{ title: "Article", href: "#" }]}
      />
      <BlogCard
        title="The man who sold the world"
        description="One upon a time a man sold the entire world"
        date={new Date().toDateString()}
        type="project"
        tags={[{ title: "Article", href: "#" }]}
      />
      <BlogCard
        title="The man who sold the world"
        description="One upon a time a man sold the entire world"
        date={new Date().toDateString()}
        type="story"
        tags={[{ title: "Article", href: "#" }]}
      />
    </div>
  );
}
