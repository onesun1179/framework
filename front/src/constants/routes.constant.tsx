import { lazy } from "react";

export const RouteComponentMap = {
	Home: lazy(() => import("@src/routes/Home")),
	ManageMenu: lazy(() => import("@src/routes/admin/MenuManagement")),
	FrameworkMenu: lazy(() => import("@src/routes/framework/MenuManagement")),
	FrameworkMessage: lazy(
		() => import("@src/routes/framework/MessageManagement")
	),
};
