import { FC, lazy } from "react";

export const All_FRONT_COMPONENT: {
	[C: string]: FC;
} = {
	RoleByMnMgmt: lazy(
		() => import("@src/component/route/roleByMnMgmt/RoleByMnMgmt")
	),
	FrmkRoleMgmt: lazy(
		() => import("@src/component/route/frmkRoleMgmt/FrmkRoleMgmt")
	),
	Hm: lazy(() => import("@src/component/route/Hm")),
	MnMgmt: lazy(() => import("@src/component/route/MnMgmt")),
	FrmkMnMgmt: lazy(() => import("@src/component/route/frmkMnMgmt/FrmkMnMgmt")),
	FrmkCdMapMgmt: lazy(
		() => import("@src/component/route/frmkCdMapMgmt/FrmkCdMapMgmt")
	),
	FrmkMsgMgmt: lazy(
		() => import("@src/component/route/frmkMsgMgmt/FrmkMsgMgmt")
	),

	FrmkMsgGrpMgmt: lazy(
		() => import("@src/component/route/frmkMsgGrpMgmt/FrmkMsgGrpMgmt")
	),
	FrmkAllFrntCmpntMgmt: lazy(
		() =>
			import("@src/component/route/frmkAllFrntCmpntMgmt/FrmkAllFrntCmpntMgmt")
	),
	FrmkFrntCmpntMgmt: lazy(
		() => import("@src/component/route/frmkFrntCmpntMgmt/FrmkFrntCmpntMgmt")
	),
	RoleByFrntCmpntMgmt: lazy(
		() => import("@src/component/route/roleByFrntCmpntMgmt/RoleByFrntCmpntMgmt")
	),
	FrmkCdMgmt: lazy(() => import("@src/component/route/frmkCdMgmt/FrmkCdMgmt")),
};
