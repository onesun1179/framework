import React, { FC, useContext } from "react";
import { RoleMgmtContext } from "@src/component/route/roleMgmt/RoleMgmt";
import { useRoleByMnMgmt1Query } from "@src/component/route/roleByMnMgmt/roleByMnMgmt.quires";
import { isNil } from "lodash";
import { Card, Tree } from "antd";
import { MenuByRoleOutput } from "@gqlType";
import { DataNode } from "antd/es/tree";
import { refetchQueryMap, UtilCommon } from "@src/Util";
import CustomIcon from "@src/component/common/customIcon/CustomIcon";
import {
	useInsertMenuByRoleMutation,
	useRearrangementMenuMutation,
	useUpdateMenuByRoleMutation,
} from "@src/component/route/roleByMnMgmt/roleByMnMgmt.mutation";

type Node = DataNode & {
	info: MenuByRoleOutput;
};
function getItem(menuItem: MenuByRoleOutput): Node {
	return {
		key: menuItem.seqNo,
		icon: UtilCommon.nilToNull(menuItem.menu.iconSeqNo, (iconSeqNo) => (
			<CustomIcon iconSeqNo={iconSeqNo} />
		)),
		children:
			menuItem.children.length > 0 ? menuItem.children.map(getItem) : undefined,
		title: `${menuItem.menu.name}(${menuItem.seqNo})(${menuItem.orderNo})`,
		info: menuItem,
	};
}

const RoleByMnMgmt: FC = () => {
	const { roleSeqNo } = useContext(RoleMgmtContext);
	const { data } = useRoleByMnMgmt1Query({
		skip: isNil(roleSeqNo),
		variables: {
			roleSeqNo: roleSeqNo!,
		},
	});
	const [insertMutate] = useInsertMenuByRoleMutation({
		refetchQueries: refetchQueryMap.menuRole,
	});
	const [updateMutate] = useUpdateMenuByRoleMutation({
		refetchQueries: refetchQueryMap.menuRole,
	});
	const [rearrangementMutate] = useRearrangementMenuMutation({
		refetchQueries: refetchQueryMap.menuRole,
	});
	return (
		<Card title={"권한 트리"}>
			<Tree<Node>
				blockNode
				showIcon
				treeData={data?.menus.map((o) => getItem(o))}
				draggable
				onDrop={(e) => {
					console.log(e);
					if (e.dropToGap) {
						rearrangementMutate({
							variables: {
								rearrangementMenuInput: {
									seqNo: e.dragNode.info.seqNo,
									parentSeqNo: e.dragNode.info.parentSeqNo,
									orderNo: e.node.info.orderNo + 1,
								},
							},
						});
					}
				}}
			/>
		</Card>
	);
};

export default RoleByMnMgmt;
