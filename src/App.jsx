import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import TvPage from "./pages/TvPage.jsx";
import FavoritePage from "./pages/FavoritePage.jsx";

function App() {
	return (
		<div className=" antialiased">
			<Router>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/movie/:id" element={<MoviePage />} />
					<Route path="/tv/:id" element={<TvPage />} />
					<Route path="/search/:query" element={<SearchPage />} />
					<Route />
					<Route path="/favorite" element={<FavoritePage />} />
					<Route />
				</Routes>
			</Router>
			{/* <Header />
			<Featured /> */}
		</div>
	);
}

export default App;
