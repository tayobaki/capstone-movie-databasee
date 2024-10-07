import { useEffect, useState } from "react";
import { getFeaturedMovie } from "../../lib/getData";
import Card from "./Card";
import { Loader2 } from "lucide-react";

function Featured() {
	const [featuredMovie, setFeaturedMovie] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFeaturedMovie = async () => {
			const data = await getFeaturedMovie();
			// await new Promise((resolve) => resolve, 200);
			setFeaturedMovie(data);
			setLoading(false);
		};
		fetchFeaturedMovie();
	}, [featuredMovie]);

	return (
		<div className="py-10">
			<h1 className="px-5 text-3xl font-semibold">Featured Movie</h1>
			{loading && (
				<div className=" mx-auto text-center mt-3">
					<Loader2 className=" text-blue-500 animate-spin duration-300 mx-auto text-center" />
				</div>
			)}
			<div className="Container">
				{featuredMovie.map((fMovie) => (
					<Card key={fMovie.id} item={fMovie} />
				))}
			</div>
		</div>
	);
}

export default Featured;
