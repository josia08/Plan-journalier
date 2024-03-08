import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import Plan from "./components/Details/Plan/Plan";
import Notes from "./components/Details/Notes/Notes";

const route = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "detail/:id",
		element: <Details />,

		children:[
			{
				path:'detail/plan',
				element:<Plan/>
			},
			{
				path:"detail/notes",
				element:<Notes/>
			}
		]
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={route} />
	</React.StrictMode>
);
