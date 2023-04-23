import { FC, lazy } from "react";

export const All_FRONT_COMPONENT: {
	[C: string]: FC;
} = {
	Hm: lazy(() => import("@src/component/route/Hm")),
	MnMgmt: lazy(() => import("@src/component/route/MnMgmt")),
	FrmkMnMgmt: lazy(() => import("@src/component/route/FrmkMnMgmt")),
	FrmkMsgMgmt: lazy(() => import("@src/component/route/FrmkMsgMgmt")),
	FrmkMsgGrpMgmt: lazy(() => import("@src/component/route/FrmkMsgGrpMgmt")),
};
