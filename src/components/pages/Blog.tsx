import type { CollectionEntry } from "astro:content";
import React, { useState, type Dispatch, type SetStateAction } from "react";
import Pagination from "../molecules/Pagination";
import Articles from "../organisms/Articles";
import LabelInput from "../templates/formInputs/LabelInput";
import Input from "../atoms/Input";
import Datalist from "../atoms/Datalist";
import {
	capitalize,
	sortAlphabetically,
	startsWithVowel,
	stringIncludes,
} from "../../utils";
import { Dropdown } from "flowbite-react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoIosArrowDown as ArrowDownI } from "react-icons/io";
import dayjs from "dayjs";

interface Props {
	page: PaginatedCollection<"posts">;
	totalPosts: CollectionEntry<"posts">[];
}

const filters: Filters<"posts"> = {
	date: (a: CollectionEntry<"posts">, b: CollectionEntry<"posts">): number =>
		dayjs(a.data.date).unix() < dayjs(b.data.date).unix() ? 1 : -1,
	alphabetically: (
		a: CollectionEntry<"posts">,
		b: CollectionEntry<"posts">,
	): number => {
		return sortAlphabetically(a.data.title, b.data.title);
	},
	category: (
		a: CollectionEntry<"posts">,
		b: CollectionEntry<"posts">,
	): number => {
		return sortAlphabetically(a.data.category, b.data.category);
	},
};

export default function Blog({ page, totalPosts }: Props) {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [orderBy, setOrderBy] = useState<orders>("date");
	const [ascending, setAscending] = useState<boolean>(true);

	const filtering: boolean = searchQuery != "";

	let posts: CollectionEntry<"posts">[] = filtering ? totalPosts : page.data;

	if (filtering) {
		posts = posts.filter((post) =>
			stringIncludes(post.data.title, searchQuery),
		);
	}

	// @ts-ignore
	posts = posts.sort(filters[orderBy]);

	if (!ascending) {
		posts = posts.reverse();
	}

	/*  posts.forEach((post) => {
    console.log(post.data.title, dayjs(post.data.date).unix());
  }); */

	return (
		<section id="Blogs" className="grid isolate relative gap-16 mb-3 h-max">
			<header className="container isolate relative h-44">
				<div className="grid content-center h-full">
					<h1>Blogs</h1>
				</div>
			</header>
			<section
				className="container
          grid grid-cols-1 md:grid-cols-[.5fr_1fr]
          gap-16 h-max"
				id="ArticlesContainer"
			>
				<div
					id="search"
					className="
					grid grid-rows-[auto_auto] gap-5 
					h-max 
					outline outline-1
   					rounded-sm p-4
					"
				>
					<div className="grid-rows-[auto_1fr] gap-5 grid h-max">
						<SearchFilter
							totalPosts={totalPosts}
							setSearchQuery={setSearchQuery}
							searchQueryValue={searchQuery}
						/>
						<OrderBy
							orderBy={orderBy}
							setOrderBy={setOrderBy}
							ascending={ascending}
							setAscending={setAscending}
						/>
					</div>
				</div>
				<section className="grid gap-12 h-min">
					{!filtering && (
						<Pagination hideOnSinglePage="hide" pageData={page.url} />
					)}
					<Articles posts={posts} />
					{!filtering && (
						<Pagination hideOnSinglePage="hide" pageData={page.url} />
					)}
				</section>
			</section>
		</section>
	);
}

function SearchFilter({
	totalPosts,
	setSearchQuery,
	searchQueryValue,
}: {
	totalPosts: CollectionEntry<"posts">[];
	setSearchQuery: Dispatch<React.SetStateAction<string>>;
	searchQueryValue: string;
}) {
	const titles = totalPosts.map((post) => post.data.title);
	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchQuery(e.target.value);
	}
	return (
		<LabelInput name="search" title="Search">
			<Input
				name="search2"
				type="text"
				placeholder="Search Categories, Titles and Tags"
				list="search-datalist"
				value={searchQueryValue}
				onChange={handleOnChange}
				aria-controls="articles search"
				role="combobox"
				aria-expanded
			/>
			<Datalist array={titles} id="search-datalist" />
		</LabelInput>
	);
}

const options: orders[] = ["alphabetically", "category", "date"];

function OrderBy({
	orderBy,
	setOrderBy,
	ascending,
	setAscending,
}: {
	orderBy: orders | "";
	ascending: boolean;
	setOrderBy: Dispatch<SetStateAction<orders>>;
	setAscending: Dispatch<SetStateAction<boolean>>;
}) {
	const Icon = ascending ? FaArrowDown : FaArrowUp;

	function handleClick(value: orders) {
		if (value == orderBy) {
			setAscending(!ascending);
		}
		setOrderBy(value);
	}

	return (
		<LabelInput
			name="order-by"
			title="Order"
			icon={Icon({ className: "size-3" })}
		>
			<input type="text" hidden id="order-by" />
			<Dropdown
				label="Dropdown button"
				dismissOnClick={false}
				renderTrigger={() => (
					<button
						className="
          text-left 
          outline-grey-600 outline outline-1 text-grey-900
          bg-grey-100
          p-2 rounded
          flex items-center gap-1
          "
					>
						{startsWithVowel(orderBy) ? "" : "By "}
						{capitalize(orderBy)} <ArrowDownI />
					</button>
				)}
			>
				{options.sort().map((opt) => (
					<DropItem
						name={opt}
						title={capitalize(opt)}
						onClick={handleClick}
						key={opt}
						icon={orderBy == opt ? Icon : undefined}
					/>
				))}
			</Dropdown>
		</LabelInput>
	);
}
function DropItem({
	name,
	title,
	onClick,
	icon,
}: {
	name: orders;
	title: string;
	onClick: (name: orders) => void;
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}) {
	return (
		<Dropdown.Item onClick={() => onClick(name)} icon={icon}>
			{title}
		</Dropdown.Item>
	);
}
