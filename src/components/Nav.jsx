import { Bookmark } from "lucide-react";

export default function Nav() {
	const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
	return (
		<nav className="bg-stone-300 w-full h-[60px] flex items-center px-10 justify-between">
			<div className="mx-auto max-w-7xl w-full flex items-center justify-between">
				<a
					href={"/"}
					className=" text-center flex items-center justify-center flex-1 tracking-tighter text-xl font-semibold"
				>
					Cineverse
				</a>

				<a href="/favorite" className="relative">
					<Bookmark />
					{favorites && (
						<div className="absolute size-3 rounded-full bg-blue-500 animate-pulse duration-300 bottom-0 -right-1" />
					)}
				</a>
			</div>
		</nav>
	);
}
