import Login from "@src/routes/Login";
import Home from "@src/routes/Home";
import { FrontComponentId } from "@gqlType";
import { FC } from "react";
import { RouteObject } from "react-router-dom";

export const COMPONENT: {
	[C in FrontComponentId]: FC;
} = {
	login: Login,
	home: Home,
} as const;

export const ROUTE_COMPONENT: {
	[C in keyof typeof COMPONENT]?: RouteObject;
} = {
	home: {},
} as const;
