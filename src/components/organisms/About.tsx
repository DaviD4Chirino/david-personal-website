import SongCard from "../molecules/SongCard";

export default function About() {
  return (
    <section className=" mx-auto max-w-[60rem] px-5 mt-5" id="About">
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <SongCard
          title={"The Man Who Sold the World"}
          author={"Midge Ure"}
          cover={"https://i.imgur.com/EpRSdeb.png"}
          type="song"
          mediaUrl={"https://music.youtube.com/watch?v=eLAUsuksF84"}
          authorUrl={
            "https://music.youtube.com/channel/UCK56pw5lCJ78diyMokcBmqw"
          }
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </section>
  );
}
