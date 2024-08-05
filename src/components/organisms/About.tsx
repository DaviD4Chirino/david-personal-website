import FigureImg from "../atoms/FigureImg";

export default function About() {
  return (
    <section
      className=" mx-auto max-w-[60rem] grid gap-5 px-5 mt-5 "
      id="About"
    >
      <h2>Who I am</h2>
      <section
        id="Presentation"
        className="grid grid-cols-1 sm:grid-cols-[.5fr_1fr] flex-wrap-reverse gap-2"
      >
        <FigureImg
          src="/sigilPixelFanart.jpg"
          alt="A badly preserved pixel fanart of a sigil from shadow of the colossus"
          imgClassName="max-h-[30rem]"
        />
        <div className=" max-w-[60ch] grid gap-3 h-min">
          <p>
            Im a programer, a bit of a web developer and game developer, tho i
            made a grand total of 2 playable games. I also hold the record of
            unfinished records
            <i>
              <small> (Like 30, tops) </small>
            </i>
            and i taught myself english, you can notice with the horrendous
            grammar you're about to see.
          </p>
          <p>
            I work for 10$ a week in{" "}
            <a href="https://es.wikipedia.org/wiki/Venezuela">Venezuela</a>, ive
            sent a lot of resumes to anybody who would ask, i even{" "}
            <del>stole</del> borrowed with permission the experience of my bff
            but to no avail.
          </p>
          <p>
            Oh and also as the time of writing this august 4 of 2024 the
            dictatorship of Nicolás Maduro is being witnessed for everybody who
            has eyes, so my situation could go anywhere.
          </p>
          <p>
            In the meantime i made web apps and test projects to spend the time
            and whoops, now i have vast React/Html/Javascript knowledge and no
            way to use it. Except for a personal page, so here we are.
          </p>
          <p>
            Below, you are gonna se the news about me, what project im working
            on, what hyperfixation i have at the moment, a review of something i
            experienced, so be my guest.
          </p>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </section>
  );
}
