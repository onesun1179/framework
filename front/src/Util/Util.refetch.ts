import { apolloClient } from "@src/graphql/apolloClient";
import { MESSAGE_ENTITIES_CONFIG_QUERY } from "@src/component/config/AntdConfigProvider";
import { MESSAGE_ENTITIES_TABLE_QUERY } from "@src/component/route/FrmkMsgMgmt";
import { ENABLE_MESSAGE_GROUP_OF_CODE_QUERY } from "@src/component/form/MessageGroupEntityForm";
import { MESSAGE_GROUP_ENTITIES_TABLE_QUERY } from "@src/component/route/FrmkMsgGrpMgmt";

export const UtilRefetch = {
	async messageGroup() {
		await apolloClient.refetchQueries({
			include: [
				MESSAGE_GROUP_ENTITIES_TABLE_QUERY,
				ENABLE_MESSAGE_GROUP_OF_CODE_QUERY,
			],
		});
	},
	async message() {
		await this.messageGroup();
		await apolloClient.refetchQueries({
			include: [MESSAGE_ENTITIES_CONFIG_QUERY, MESSAGE_ENTITIES_TABLE_QUERY],
		});
	},
};
