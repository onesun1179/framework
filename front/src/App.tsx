import "./App.css";
import { FC } from "react";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import FullLayout from "@src/component/layout/FullLayout";
import { RouterProvider } from "react-router-dom";

const App: FC<{
	router: RemixRouter;
}> = ({ router }) => {
	return (
		<FullLayout>
			<RouterProvider router={router} />
		</FullLayout>
	);
};

export default App;
