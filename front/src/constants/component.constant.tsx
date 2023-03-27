import { FC, lazy } from "react";

export const All_FRONT_COMPONENT: {
	[C: string]: FC;
} = {
	Home: lazy(() => import("@src/routes/Home")),
	MenuManagement: lazy(() => import("@src/routes/admin/MenuManagement")),
	FrameworkMenuManagement: lazy(
		() => import("@src/routes/framework/MenuManagement")
	),
	FrameworkMessageManagement: lazy(
		() => import("@src/routes/framework/MessageManagement")
	),
};
