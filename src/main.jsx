import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Nav from "../src/components/Nav.jsx";
import { ContextProvider } from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ContextProvider>
			<Nav />
			<App />
		</ContextProvider>
	</StrictMode>
);
