import Login from "@src/routes/Login";
import Home from "@src/routes/Home";
import { FrontComponentId } from "@gqlType";
import { FC } from "react";

export const COMPONENT: {
	[C in FrontComponentId]: FC;
} = {
	login: Login,
	home: Home,
} as const;

// export const COMPONENT_LOADER: {
// 	[C in keyof typeof COMPONENT]?: LoaderFunction;
// } = {
// 	home: () => void 0,
// };
