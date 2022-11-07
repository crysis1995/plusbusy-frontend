import React from "react";
import { RouterProvider } from "react-router-dom";
import { BrowseRouter } from "./routes";

function App() {
	return <RouterProvider router={BrowseRouter} />;
}

export default App;
