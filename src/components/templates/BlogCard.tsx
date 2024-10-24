import type { CollectionEntry } from "astro:content";
import routes from "../../routes.json";
import Tag from "../atoms/Tag";
import { capitalize, cleanString } from "../../utils";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
type posts = {
	slug: string;
	entry: {
		title: string;
		description: string;
		category: string;
		tags: readonly string[];
		date: string;
		content: () => Promise<{
			node: Node;
		}>;
	};
};

interface Props {
	post: CollectionEntry<"posts">;
}
const outlines = [
	"outline",
	"outline-dashed",
	"outline-dotted",
	"outline-double",
];
const categoryOutlines = {
	Godot: "outline-dotted",
	Article: "outline",
	Personal: "outline-double",
	"Post-Mortem": "outline-dashed",
};
export default function BlogCard({ post }: Props) {
	const { date, tags, category, description, title } = post.data;
	// const formattedDate = new Date(date).to
	const formattedDate = dayjs(date).add(4, "hour").format("MMMM D, YYYY");

	return (
		<article
			className={`
				
			p-3 no-underline rounded-2xl transition-transform ${getOutline(
				category,
			)} hover:rotate-2 motion-reduce:hover:rotate-0 bg-grey-50 shadow-lg 

			
			`}
			id="BlogCard"
		>
			<a
				href={`${routes.article}/${post.slug}`}
				className="
				grid gap-4 h-full grid-rows-[auto_1fr_auto]
				no-underline
				"
			>
				<div
					className="flex flex-wrap gap-3 h-max justify-between w-full"
					id="Head"
				>
					<b className="leading-5 no-underline [align-self:baseline]">
						<h5 id="Title">{title}</h5>
					</b>
					<p className="text-sm text-right text-grey-600 text-kanit" id="Date">
						{formattedDate}
					</p>
				</div>
				<p>{description}</p>
				<div
					className="
					flex overflow-x-auto gap-2 
					place-content-end
					py-2
					"
					id="Tags"
				>
					<Tag title={capitalize(cleanString(category))} variant="filled" />
					{tags.map((tag: string) => tag && <Tag title={tag} key={uuid()} />)}
				</div>
			</a>
		</article>
	);
}
function getOutline(name: string): string {
	const hasNameIndex = Object.keys(categoryOutlines).findIndex(
		(category) =>
			capitalize(cleanString(category)) == capitalize(cleanString(name)),
	);

	if (hasNameIndex > -1) {
		return Object.values(categoryOutlines)[hasNameIndex];
	}

	return outlines[name.length % outlines.length];
}
