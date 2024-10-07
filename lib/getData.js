const URL = async (url) => {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${import.meta.env.VITE_TMBD_API_TOKEN}`,
		},
	};

	const res = await fetch(`https://api.themoviedb.org/3/${url}`, options);

	if (!res.ok) {
		throw new Error("Failed to fetch data from TMDB API");
	}
	return res.json();
};

export const getFeaturedMovie = async () => {
	try {
		const data = await URL("movie/now_playing?language=en-US&page=1");

		return data.results;
	} catch (error) {
		console.error("Error fetching featured movies:", error);
		return [];
	}
};

export const getSearchQuery = async (query, page) => {
	const data = await URL(
		`search/multi?query=${encodeURIComponent(
			query.replace(/-/g, " ")
		)}&include_adult=true&language=en-US&page=${page}`
	);

	// Group results by name (or title)
	const processedResults = data.results
		.filter((item) => item.poster_path && item.media_type !== "person")
		.reduce((acc, item) => {
			const key = item.name || item.title;
			if (!acc[key] || item.popularity > acc[key].popularity) {
				acc[key] = item;
			}
			return acc;
		}, {});

	const results = Object.values(processedResults);

	return {
		results,
		total_pages: Math.ceil(data.total_results / 20),
	};
};

async function getSingleItemID(id, type) {
	try {
		const data = await URL(
			`${type}/${id}?append_to_response=credits,recommendations`
		);
		return data;
	} catch (error) {
		console.error(`Error finding ${type}:`, error.message);
		return null;
	}
}

// Exported functions to get single TV or Movie ID
export const getSingleTvID = (id) => getSingleItemID(id, "tv");

export const getSingleMovieID = (id) => getSingleItemID(id, "movie");
