import BlogCard, { BlogCardProps } from "../molecules/BlogCard";

export default function Updates() {
  const types: BlogCardProps["category"][] = [
    "article",
    "project",
    "personal",
    "game-development",
  ];
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {/* {new Date().getTime()} */}
      {types.map((el, index) => (
        <BlogCard
          title="The man who sold the world"
          description="One upon a time a man sold the entire world"
          date={new Date().toDateString()}
          category={el}
          tags={"One Tag, Two tags, a very very long tag"}
          key={index}
        />
      ))}
    </div>
  );
}
