import React, { useState } from "react";
import { getSearchQuery } from "../../lib/getData";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/Context";

function CustomForm() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const { setSearchResults, setSearchQuery } = useStateContext();
	const [search, setSearch] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (search.length < 2) {
			setErrorMessage("Query must be at least 2 characters.");
			return;
		}

		const decodedSearch = decodeURIComponent(search);
		const hyphenatedSearch = decodedSearch.split(" ").join("-");
		navigate(`/search/${hyphenatedSearch}`);
		setIsLoading(true);
		try {
			const { results } = await getSearchQuery(search, 1);
			setSearchResults(results);
			setSearchQuery(search);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className=" relative">
			<input
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Search for movies or shows"
				className=" p-2 outline-none border-none rounded-md  text-black w-full text-sm placeholder:text-sm pl-3"
			/>
			<div className="absolute right-3 bottom-1/2 translate-y-1/2">
				{isLoading && <div class="loader" />}
			</div>
			{errorMessage && (
				<div className="text-red-500 absolute top-full left-0">
					{errorMessage}
				</div>
			)}
			<button className=" mt-7 w-full p-1.5 bg-[#181F30] hover:bg-[#181F30]/90 rounded-md">
				Explore Now
			</button>
		</form>
	);
}

export default CustomForm;
