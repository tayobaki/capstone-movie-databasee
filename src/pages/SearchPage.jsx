import Card from "../components/Card";
import { useStateContext } from "../context/Context";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigation, useParams, useSearchParams } from "react-router-dom";
import { getSearchQuery } from "../../lib/getData";

export default function SearchPage({}) {
	const { query } = useParams();
	const { searchResults, searchQuery, setSearchResults } = useStateContext();
	const [total, setTotal] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (searchQuery) {
			fetchResults();
		}
	}, [searchQuery, page]);

	async function fetchResults() {
		setIsLoading(true);
		try {
			const { results, total_pages } = await getSearchQuery(searchQuery, page);
			setSearchResults(results);
			setTotal(total_pages);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	console.log(query);

	return (
		<div className="mx-auto my-9 max-w-5xl font-quicksand">
			<span className=" text-4xl px-5 font-baskervile tracking-tighter mb-10 font-bold">
				{searchResults && searchResults.length === 0 && (
					<>No Search results for "{query}"</>
				)}
				{searchResults && searchResults.length > 0 && (
					<>Search results for "{query}"</>
				)}
			</span>
			<div className="mt-8 px-5 flex items-center justify-center gap-3">
				<button
					disabled={page <= 1}
					onClick={() => setPage(page - 1)}
					className=" border rounded-md px-6 py-2"
				>
					Prev
				</button>
				<h1>
					{page} of {total}
				</h1>
				<button
					disabled={page >= total}
					onClick={() => setPage(page + 1)}
					className=" border rounded-md px-6 py-2"
				>
					Next
				</button>
			</div>
			<div className="Container">
				{searchResults &&
					searchResults?.map((query) => (
						<>
							{isLoading ? (
								<div>
									{Array.from({ length: 1 }).map((item, idx) => (
										<React.Fragment key={idx}>
											<div className="aspect-[4/6] rounded-xl animate-pulse duration-700 bg-stone-200" />
											<div className="mt-1 ml-1 rounded-full animate-pulse duration-700 h-3 w-20 bg-stone-200" />
											<div className="ml-1 flex items-end justify-between mt-2">
												<div className="h-3 w-10 duration-700 bg-stone-200 rounded-full animate-pulse" />
												<div className="w-[47px] h-3 rounded-full py-0.5 duration-700 bg-stone-200 animate-pulse" />
											</div>
										</React.Fragment>
									))}
								</div>
							) : (
								<>
									<Card key={query.id} item={query} />
								</>
							)}
						</>
					))}
			</div>
		</div>
	);
}
