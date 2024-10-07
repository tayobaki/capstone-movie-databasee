// import { Button } from "./ui/button";
import CustomForm from "./CustomForm";

import bg from "/bg.jpg";

export default function Header() {
	return (
		<header className=" h-[350px] font-baskervile grid place-items-center items-center relative text-white">
			<img
				src={bg}
				alt="background"
				className="h-[350px] bg-no-repeat bg-right-bottom absolute inset-0 w-full brightness-50 -z-10 object-cover blur-sm"
			/>
			<div className=" space-y-6">
				<h1 className="text-5xl font-semibold tracking-tighter">
					Welcome to Cineverse
				</h1>
				<span>Explore the world of movies and Tv shows</span>
				<CustomForm />
			</div>
		</header>
	);
}
