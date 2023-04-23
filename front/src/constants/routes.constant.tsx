import { lazy } from "react";

export const RouteComponentMap = {
	Home: lazy(() => import("@src/component/route/Hm")),
	ManageMenu: lazy(() => import("@src/component/route/MnMgmt")),
	FrameworkMenu: lazy(() => import("@src/component/route/FrmkMnMgmt")),
	FrameworkMessage: lazy(() => import("@src/component/route/FrmkMsgMgmt")),
};
