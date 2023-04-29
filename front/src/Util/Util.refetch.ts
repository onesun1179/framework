import { mapValues } from "lodash";
import { apolloClient } from "@src/graphql/apolloClient";
import { FRMK_MSG_GRK_MGMT_DATA_QUERY } from "@src/component/route/frmkMsgGrpMgmt";
import { FRMK_MSG_MGMT_DATA } from "@src/component/route/frmkMsgMgmt";
import { FRMK_FRNT_CMPNT_MGMT_QUERY } from "@src/component/route/frmkFrntCmpntMgmt";
import { ROLE_BY_FRNT_CMPNT_MGMT_QUERY } from "@src/component/route/roleByFrntCmpntMgmt";
import { ROLE_DIRECTORY_TREE_QUERY } from "@src/component/role/RoleDirectoryTree/quires";
import { FRMK_MN_MGMT_QUERY } from "@src/component/route/frmkMnMgmt";
import { FRMK_CD_MGMT_1_QUERY } from "@src/component/route/frmkCdMgmt";
import {
	FRMK_CD_MAP_MGMT_1_QUERY,
	FRMK_CD_MAP_MGMT_2_QUERY,
} from "@src/component/route/frmkCdMapMgmt";

export const refetchQueryMap = {
	messageGroup: [FRMK_MSG_GRK_MGMT_DATA_QUERY],
	message: [FRMK_MSG_MGMT_DATA],
	allFrontComponent: [
		FRMK_FRNT_CMPNT_MGMT_QUERY,
		ROLE_BY_FRNT_CMPNT_MGMT_QUERY,
	],
	frontComponent: [FRMK_FRNT_CMPNT_MGMT_QUERY],
	roleGroup: [ROLE_DIRECTORY_TREE_QUERY],
	role: [ROLE_DIRECTORY_TREE_QUERY],
	menu: [FRMK_MN_MGMT_QUERY],
	code: [FRMK_CD_MGMT_1_QUERY, FRMK_CD_MAP_MGMT_1_QUERY],
	codeMap: [FRMK_CD_MAP_MGMT_2_QUERY],
};
export const UtilRefetch = mapValues(refetchQueryMap, (o) => {
	return async () =>
		await apolloClient.refetchQueries({
			include: o,
		});
});
