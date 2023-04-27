import React, { useMemo } from "react";
import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { DirectoryTreeProps } from "antd/es/tree/DirectoryTree";
import { useRoleDirectoryTreeQuery } from "@src/component/role/RoleDirectoryTree/quires";
import { RoleGroupEntityOutput } from "@gqlType";

type DataNodeType = DataNode & {
	seqNo: number;
	type: "group" | "role";
};

interface RoleDirectoryTreeProps
	extends Omit<DirectoryTreeProps<DataNodeType>, "treeData"> {}

function makeRoleTreeData(
	data: Array<RoleGroupEntityOutput>
): Array<DataNodeType> {
	return data.map((o) => {
		return {
			title: o.name,
			key: `grp-${o.seqNo}`,
			isLeaf: false,
			selectable: false,
			seqNo: o.seqNo,
			type: "group",
			children: [
				...makeRoleTreeData(o.children),
				...o.roles.map((oo) => {
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

function RoleDirectoryTree({ ...props }: RoleDirectoryTreeProps) {
	const { data, previousData } = useRoleDirectoryTreeQuery();
	const _data = useMemo(() => data || previousData, [data, previousData]);

	const roleGroupEntities = useMemo(
		() => (_data ? makeRoleTreeData(_data?.roleGroupEntities.list) : undefined),
		[_data]
	);
	return props.defaultExpandAll ? (
		_data ? (
			<Tree.DirectoryTree<DataNodeType>
				treeData={roleGroupEntities}
				{...props}
			/>
		) : null
	) : (
		<Tree.DirectoryTree<DataNodeType> treeData={roleGroupEntities} {...props} />
	);
}

export default RoleDirectoryTree;
