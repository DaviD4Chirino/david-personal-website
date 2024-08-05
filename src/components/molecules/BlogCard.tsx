export default function BlogCard() {
  return (
    <article
      className="
		grid grid-cols-1 gap-3 grid-rows-1
		sm:grid-cols-[.5fr_1fr] sm:grid-rows-[auto_1fr_auto]
		bg-[white] 
		rounded-lg
		h-40
		
		"
    >
      <img
        className="
					object-cover
					rounded-lg

					rounded-bl-none
					rounded-br-none

					sm:rounded-tr-none
					sm:rounded-bl-lg
					
					shadow-lg
					h-40 w-full
				"
        src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt=""
      />

      <div
        className="
				h-full
			grid grid-rows-[auto_3ch_1fr] gap-4 
			p-2
			
			"
      >
        <a href="#" className="text-xl no-underline text-kanit">
          How to use sticky note for problem solving
        </a>

        <div className="description text-ellipsis ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          assumenda nesciunt laudantium itaque dolores reiciendis amet explicabo
          illo nobis, fuga vel quo repellat ratione, ex veritatis! Odio
          repudiandae provident aliquid.
        </div>

        <span className="text-sm opacity-40 text-right">
          On: 20 October 2019
        </span>
      </div>
    </article>
  );
}
