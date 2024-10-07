import { Monitor, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Card({ item }) {
	return (
		<Link
			onClick={() => {
				window.scrollTo({ top: 0, behavior: "smooth" });
			}}
			to={`/${
				item.media_type === "movie"
					? "movie"
					: item.media_type === "tv"
					? "tv"
					: item.first_air_date
					? "tv"
					: item.release_date
					? "movie"
					: ""
			}/${item.id}`}
			className=" "
		>
			<div className="relative group/card">
				<img
					src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
					className=" aspect-[4/6] rounded-xl"
					alt={item.title || item.original_title || ""}
				/>

				<div className="absolute right-2 opacity-0 bottom-2 -mb-2 transition-all group-hover/card:mb-1 size-10 hidden md:flex justify-center items-center rounded-full group-hover/card:opacity-100 duration-300 p-1 bg-transparent backdrop-blur-sm backdrop-invert group/plus group/icon">
					<Monitor
						color="#fff"
						className=" group-hover/plus:scale-100 absolute group-hover/plus:-mt-10 scale-0  h-[1.8rem] opacity-0 group-hover/plus:opacity-100 transition-all w-[1.8rem] flex items-center justify-center left-1/2 -translate-x-1/2 top-0 mt-0 duration-300  bg-black/60 shadow-lg p-2 rounded-full backdrop-blur-sm"
					/>

					<div className="relative  backdrop-blur-sm backdrop-invert bg-transparent">
						<Plus
							color="#000"
							className="h-[1.2rem] transition w-[1.2rem] rotate-0 group-hover/icon:-rotate-45 scale-100 absolute  flex items-center justify-center  top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 backdrop-blur-sm backdrop-invert bg-transparent"
						/>
					</div>
				</div>
			</div>
			<div className="mt-1 ml-1 font-quicksand">
				<h1 className="truncate text-sm font-semibold ">
					{item.title ||
						item.original_title ||
						item.name ||
						item.original_name ||
						item.Title}
				</h1>
				<div className="text-xs flex items-end justify-between">
					<h6>
						{new Date(item.release_date || item.first_air_date).getFullYear()}
					</h6>
					<div className="mt-1 uppercase border rounded-md border-black/40 w-[47px] py-0.5 grid place-items-center text-[9px]">
						{item.media_type === "movie"
							? "movie"
							: item.media_type === "tv"
							? "tv"
							: item.first_air_date
							? "tv"
							: item.release_date
							? "movie"
							: ""}
					</div>
				</div>
			</div>
		</Link>
	);
}
