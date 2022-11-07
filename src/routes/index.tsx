import { createBrowserRouter } from "react-router-dom";
import IndexPage, { CalendarPage, CoursesPage, DriversPage } from "../components/Page.Index";
import LoginPage from "../components/Page.Login";

export const BrowseRouter = createBrowserRouter([
	{
		path: "/",
		element: <IndexPage />,
		children: [
			{ path: "/", element: <CalendarPage /> },
			{ path: "/courses", element: <CoursesPage /> },
			{ path: "/drivers", element: <DriversPage /> },
		],
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
]);
