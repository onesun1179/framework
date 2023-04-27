import { mapValues } from "lodash";
import { apolloClient } from "@src/graphql/apolloClient";

import { FRMK_MSG_GRK_MGMT_DATA } from "@src/component/route/FrmkMsgGrpMgmt/quires";
import { FRMK_FRNT_CMPNT_MGMT_DATA } from "@src/component/route/FrmkFrntCmpntMgmt/quires";
import { FRMK_MSG_MGMT_DATA } from "@src/component/route/FrmkMsgMgmt/quires";
import { ROLE_DIRECTORY_TREE_QUERY } from "@src/component/role/RoleDirectoryTree/quires";
import { ROLE_BY_FRNT_CMPNT_MGMT_QUERY } from "@src/component/route/RoleByFrntCmpntMgmt/quries";

export const refetchQueryMap = {
	messageGroup: [FRMK_MSG_GRK_MGMT_DATA],
	message: [FRMK_MSG_MGMT_DATA],
	allFrontComponent: [FRMK_FRNT_CMPNT_MGMT_DATA, ROLE_BY_FRNT_CMPNT_MGMT_QUERY],
	frontComponent: [FRMK_FRNT_CMPNT_MGMT_DATA],
	roleGroup: [ROLE_DIRECTORY_TREE_QUERY],
	role: [ROLE_DIRECTORY_TREE_QUERY],
};
export const UtilRefetch = mapValues(refetchQueryMap, (o) => {
	return async () =>
		await apolloClient.refetchQueries({
			include: o,
		});
});
