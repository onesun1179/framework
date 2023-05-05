import React, { FC, useContext, useMemo } from "react";
import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { useRoleDirectoryTreeQuery } from "@src/component/role/quires";
import { RoleGroupOutput } from "@gqlType";
import { RoleMgmtContext } from "@src/component/route/roleMgmt/RoleMgmt";

type DataNodeType = DataNode & {
	seqNo: number;
	type: "group" | "role";
};

interface RoleDirectoryTreeProps {}

function makeRoleTreeData(data: Array<RoleGroupOutput>): Array<DataNodeType> {
	return data.map((o) => {
		return {
			title: o.name,
			key: `grp-${o.seqNo}`,
			isLeaf: false,
			selectable: false,
			seqNo: o.seqNo,
			type: "group",
			children: [
				...makeRoleTreeData(o.children.list),
				...o.roles.list.map((oo) => {
					return {
						title: oo.name,
						key: `role-${oo.seqNo}`,
						isLeaf: true,
						selectable: true,
						seqNo: oo.seqNo,
						type: "role",
					};
				}),
			],
		};
	});
}

const RoleDirectoryTree: FC<RoleDirectoryTreeProps> = () => {
	const { roleSeqNo, setRoleSeqNo } = useContext(RoleMgmtContext);
	const { data, previousData } = useRoleDirectoryTreeQuery();
	const _data = useMemo(() => data || previousData, [data, previousData]);

	const roleGroupEntities = useMemo(
		() => (_data ? makeRoleTreeData(_data?.roleGroups.list) : undefined),
		[_data]
	);

	return _data ? (
		<Tree.DirectoryTree<DataNodeType>
			treeData={roleGroupEntities}
			selectedKeys={roleSeqNo ? [`role-${roleSeqNo}`] : undefined}
			onSelect={(o, b) => {
				setRoleSeqNo(b.node.seqNo);
			}}
			defaultExpandAll
		/>
	) : null;
};

export default RoleDirectoryTree;
