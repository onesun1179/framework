import { FC } from "react";
import { gql, useQuery } from "@apollo/client";
import { Path } from "@gqlType";
import { Route, Routes } from "react-router-dom";

const gqlPathList = gql`
	fragment PathRec on Path {
		id
		title
		pathname
		componentPath
	}
	query {
		pathList {
			...PathRec
			children {
				...PathRec
				children {
					...PathRec
					children {
						...PathRec
						children {
							...PathRec
						}
					}
				}
			}
		}
	}
`;

const ApiRoutes: FC = () => {
	const { loading, error, data } = useQuery<{
		pathList: Path[];
	}>(gqlPathList);

	console.log(data);
	if (data && data.pathList.length > 0) {
		return <ApiRoutesWithChildren pathList={data.pathList} />;
	}
	return null;
};

const ApiRoutesWithChildren: FC<{
	pathList: Path[];
}> = ({ pathList }) => {
	return (
		<Routes>
			{pathList.map((path) => (
				<Route
					key={path.id}
					path={path.pathname}
					// element={createElement(lazy(() => import("../../routes/Home")))}
				>
					{path.children.length > 0 && (
						<ApiRoutesWithChildren pathList={path.children} />
					)}
				</Route>
			))}
		</Routes>
	);
};

export default ApiRoutes;
