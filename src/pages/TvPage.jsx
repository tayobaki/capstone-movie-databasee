import { Link, useParams } from "react-router-dom";
import { getSingleMovieID, getSingleTvID } from "../../lib/getData";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Loader2, Plus } from "lucide-react";
import { useStateContext } from "../context/Context";

function TvPage() {
	const { id } = useParams();
	const [tvDetails, setTvDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { saveFavorite } = useStateContext();

	useEffect(() => {
		const fetchTvDetails = async () => {
			const data = await getSingleTvID(id);
			setTvDetails(data);
			setIsLoading(false);
		};
		fetchTvDetails();
	}, [id, tvDetails]);

	if (!tvDetails && !isLoading) {
		return <div className="">Error: Tv Show {id} not found</div>;
	}

	return (
		<div className="text-white">
			<div className="pt-0 bg-[#22212D] min-h-screen relative ">
				{isLoading && (
					<div className="z-50">
						<Loader2
							size={25}
							className=" text-blue-500 mx-auto animate-spin absolute left-1/2 top-1/2 duration-300"
						/>
					</div>
				)}
				<div className="absolute inset-0 overflow-hidden grayscale">
					<img
						src={`https://image.tmdb.org/t/p/w500${tvDetails?.poster_path}`}
						width={1000}
						height={1000}
						alt={tvDetails?.name}
						className="absolute inset-0 w-full bg-cover blur-[10px] opacity-35 brightness-50 "
					/>
				</div>
				<div className="backdrop-blur-lg min-h-screen z-50 p-8 relative w-full ">
					<div className="grid grid-cols-1 lg:grid-cols-[200px_0.8fr] h-full items-start justify-center gap-8">
						<img
							src={`https://image.tmdb.org/t/p/w500${tvDetails?.poster_path}`}
							width={200}
							height={200}
							alt={tvDetails?.name}
							className=" rounded-md "
						/>
						<div className="mt-6 max-w-[1200px] space-y-5 pr-8">
							<h1 className=" text-4xl font-semibold font-baskervile">
								{tvDetails?.title ||
									tvDetails?.name ||
									tvDetails?.oroginal_name ||
									tvDetails?.original_title}
							</h1>
							<button
								onClick={() => saveFavorite(tvDetails)}
								className="bg-white rounded-full text-black space-x-2 w-fit flex px-3 py-2"
							>
								<Plus size={25} color="#000" />
								<span className=" text-lg">Add to list</span>
							</button>
							<p className=" line-clamp-6">{tvDetails?.overview}</p>

							<div className="backdroop-blur-2xl text-sm grid grid-cols-2 gap-3 justify-center  shadow h-full p-4 ">
								<div>
									<strong>Duration</strong>: {""}
									{tvDetails?.runtime}m
								</div>
								<div>
									<strong>Status</strong>:{""} {tvDetails?.status}
								</div>
								<div className="">
									<strong>Mal Average</strong>: {""}{" "}
									{tvDetails?.vote_average ? (
										<> {tvDetails?.vote_average.toFixed(1)}</>
									) : (
										"N/A"
									)}
								</div>
								<div className="">
									<strong>Genres</strong>:{" "}
									{tvDetails?.genres
										.slice(0, 2)
										.map((genre) => genre.name)
										.join(", ")}
								</div>
								<div className="">
									<strong>Production</strong>: {""}
									{tvDetails?.production_companies ? (
										<>
											{tvDetails?.production_companies
												.slice(0, 1)
												.map((pCompany) => pCompany.name)
												.join(", ")}
										</>
									) : (
										"N/A"
									)}
								</div>
								<div className="">
									<strong>Countries</strong>: {""}
									{tvDetails?.production_countries ? (
										<>
											{tvDetails?.production_countries
												.slice(0, 2)
												.map((pCompany) => pCompany.name)
												.join(", ")}
										</>
									) : (
										"N/A"
									)}
								</div>
								<div className="">
									<strong>Casts</strong>: {""}
									{tvDetails?.credits.cast
										.slice(0, 2)
										.map((item) => item.name || item.original_name)
										.join(", ")}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className=" text-black max-w-7xl pb-10 mt-16 mx-auto">
				<h1 className=" text-4xl font-semibold px-5">You may also like</h1>
				<div className="Container mt-10">
					{tvDetails?.recommendations.results.map((recommendations) => (
						<Card key={recommendations.id} item={recommendations} />
					))}
				</div>
			</div>
		</div>
	);
}

export default TvPage;
