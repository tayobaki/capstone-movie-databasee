import Featured from "../components/Featured.jsx";
import Header from "../components/Header.jsx";

function HomePage() {
	return (
		<div className=" antialiased">
			<Header />
			<div className=" mx-auto max-w-5xl">
				<Featured />
			</div>
		</div>
	);
}

export default HomePage;
