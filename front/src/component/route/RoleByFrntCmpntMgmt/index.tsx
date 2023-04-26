/**
 * 권한별 컴포넌트
 */
import { FC, memo, useMemo, useState } from "react";
import { Col, Layout, Row, Table, Tree, Typography } from "antd";

import { DataNode } from "antd/es/tree";
import {
	AllFrontComponentEntityOutput,
	FrontComponentEntityOutput,
	RoleGroupEntityOutput,
} from "@gqlType";
import styled from "styled-components";
import { ColumnsType } from "antd/es/table";
import { useRoleByFrntCmpntMgmtQuery } from "@src/component/route/RoleByFrntCmpntMgmt/quries";

type DataNodeType = DataNode & {
	seqNo: number;
	type: "group" | "role";
};

const StyledHeader = styled(Layout.Header)`
	background-color: white;
`;

const frntCmpntColumns: ColumnsType<FrontComponentEntityOutput> = [
	{
		key: "id",
		dataIndex: "id",
		title: "ID",
	},
	{
		key: "name",
		dataIndex: "name",
		title: "이름",
	},
];

const allFrntCmpntColumns: ColumnsType<AllFrontComponentEntityOutput> = [
	{
		key: "id",
		dataIndex: "id",
		title: "ID",
	},
];
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
const RoleByFrntCmpntMgmt: FC = () => {
	const [roleSeqNo, setRoleSeqNo] = useState<number>();
	const { data, loading, previousData } = useRoleByFrntCmpntMgmtQuery();

	const roleTreeData = useMemo<Array<DataNodeType>>(
		() => (data ? makeRoleTreeData(data?.roleGroupEntities.list) : []),
		[data]
	);

	console.log(data);

	return (
		<Row gutter={[16, 16]} wrap>
			<Col span={8}>
				<Layout>
					<StyledHeader>
						<Typography.Title level={3}>권한</Typography.Title>
					</StyledHeader>
					<Layout.Content>
						<Tree.DirectoryTree<DataNodeType>
							defaultExpandAll
							treeData={roleTreeData}
							onSelect={(e, a) => {
								setRoleSeqNo(a.node.seqNo);
								console.log(e, a);
								// setRoleSeqNo(a.)
							}}
						/>
					</Layout.Content>
				</Layout>
			</Col>
			<Col span={16}>
				<Layout>
					<StyledHeader>
						<Typography.Title level={3}>권한</Typography.Title>
					</StyledHeader>
					<Layout.Content>
						<Table
							columns={frntCmpntColumns}
							dataSource={
								data?.frontComponentEntities.list ||
								previousData?.frontComponentEntities.list
							}
							loading={loading}
							rowKey={"id"}
						/>
					</Layout.Content>
				</Layout>
			</Col>
			{/*<Col span={8}>*/}
			{/*	<Layout>*/}
			{/*		<StyledHeader>*/}
			{/*			<Typography.Title level={3}>권한</Typography.Title>*/}
			{/*		</StyledHeader>*/}
			{/*		<Layout.Content>*/}
			{/*			<Table*/}
			{/*				rowSelection={{*/}
			{/*					type: "radio",*/}
			{/*				}}*/}
			{/*				columns={allFrntCmpntColumns}*/}
			{/*				dataSource={*/}
			{/*					data?.allFrontComponentEntities.list ||*/}
			{/*					previousData?.allFrontComponentEntities.list*/}
			{/*				}*/}
			{/*				loading={loading}*/}
			{/*				rowKey={"id"}*/}
			{/*			/>*/}
			{/*		</Layout.Content>*/}
			{/*	</Layout>*/}
			{/*</Col>*/}
		</Row>
	);
};

export default memo(RoleByFrntCmpntMgmt);
