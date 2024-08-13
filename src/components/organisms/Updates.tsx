import Articles from "./Articles";
export default function Updates() {
  return (
    <div className="container grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
      <Articles count={6} />
    </div>
  );
}
