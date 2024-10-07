"use client";

import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext(null);

export const ContextProvider = ({ children }) => {
	const [page, setPage] = useState(1);
	const [searchResults, setSearchResults] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	const saveFavorite = (movie) => {
		const favorites = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

		const isAlreadyFavorite = favorites.some((fav) => fav.id === movie.id);

		if (!isAlreadyFavorite) {
			favorites.push(movie);
			localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
		} else {
			alert(
				`${
					movie.title ||
					movie.original_title ||
					movie.name ||
					movie.original_name ||
					movie.Title
				} is already in favorites!`
			);
		}
	};

	useEffect(() => {
		const savedResults = localStorage.getItem("searchResults");
		const savedQuery = localStorage.getItem("searchQuery");
		if (savedResults && savedQuery) {
			setSearchResults(JSON.parse(savedResults));
			setSearchQuery(savedQuery);
		}
	}, []);

	useEffect(() => {
		if (searchResults.length > 0) {
			localStorage.setItem("searchResults", JSON.stringify(searchResults));
			localStorage.setItem("searchQuery", searchQuery);
		}
	}, [searchResults, searchQuery]);

	return (
		<Context.Provider
			value={{
				searchResults,
				setSearchResults,
				searchQuery,
				setSearchQuery,
				page,
				setPage,
				saveFavorite,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
