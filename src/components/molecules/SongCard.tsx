import { PiMusicNoteFill as MusicNoteI } from "react-icons/pi";
import { MdAlbum as AlbumI } from "react-icons/md";

export default function SongCard({
  type = "song",
  title,
  author,
  cover,
  mediaUrl,
  authorUrl,
}: {
  type?: "album" | "song";
  title: string;
  author: string;
  cover: string;
  /** The site to hear the song or album */
  mediaUrl: string;
  /** The author page */
  authorUrl: string;
}) {
  const iconClassNames = `
	absolute -bottom-5 -right-7
	size-32
	-z-1
	
	
	`;
  return (
    <article
      className="
			song-card
		grid grid-cols-[8rem_1fr] 
		gap-3
	bg-secondary
		rounded-xl
		h-32
		relative isolate
		 "
    >
      <a href={mediaUrl} target="_blank">
        <img
          src={cover}
          className="
				object-fit
				aspect-square
				rounded-tl-xl  rounded-bl-xl "
          alt={`cover image for the ${type}; ${title}`}
        />
      </a>
      <div
        className=" 
			p-2 pl-0
			grid grid-rows-[auto_1fr_auto]
			
			"
      >
        <a href={mediaUrl} className="no-underline" target="_blank">
          <b
            id="Title "
            className="
					leading-1 
					
					sm:text-base"
          >
            {title}
          </b>
        </a>

        <a href={authorUrl} target="_blank">
          <div className="flex gap-1">
            <p id="Artist">{author}</p>
          </div>
        </a>
        <p className="text-right text-xs text-opacity-50" id="Category">
          {type == "album" ? "Album" : "Song"}
        </p>
      </div>
      {type == "album" ? (
        <AlbumI
          className={iconClassNames}
          style={{ zIndex: -1 }}
          color="white"
        />
      ) : (
        <MusicNoteI
          className={iconClassNames}
          style={{ zIndex: -1 }}
          color="white"
        />
      )}
    </article>
  );
}
