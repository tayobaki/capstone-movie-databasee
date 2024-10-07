import Card from "../components/Card";

function FavoritePage() {
	const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

	console.log(favorites);

	return (
		<div className=" mx-auto max-w-6xl">
			<h1 className=" text-3xl font-semibold mt-9 px-5">Favorite Shows</h1>
			<div className=" text-black Container">
				{favorites.map((fav) => (
					<Card key={fav.id} item={fav} />
				))}
			</div>
		</div>
	);
}

export default FavoritePage;
