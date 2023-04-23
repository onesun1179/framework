import { FC, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { Menu, Menus, MenusRequest, PagingRequest } from "@gqlType";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

const QUERY = gql`
	query ($paging: PagingRequest!, $param: MenusRequest!) {
		menus(paging: $paging, param: $param) {
			list {
				seqNo
				name
				createdAt
				desc
				updatedAt
				iconSeqNo
			}
			total
		}
	}
`;

const columns: ColumnsType<Menu> = [
	{
		title: "일련번호",
		dataIndex: "seqNo",
		key: "seqNo",
	},
	{
		title: "이름",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "생성시간",
		dataIndex: "createdAt",
		key: "createdAt",
	},
	{
		title: "비고",
		dataIndex: "desc",
		key: "desc",
	},
	{
		title: "수정시간",
		dataIndex: "updatedAt",
		key: "updatedAt",
	},
];

const FrmkMnMgmt: FC = () => {
	const { data, loading } = useQuery<
		{
			menus: Menus;
		},
		{
			paging: PagingRequest;
			param?: MenusRequest;
		}
	>(QUERY, {
		variables: {
			paging: {
				skip: 0,
				take: 50,
			},
			param: {},
		},
	});

	const dataSource = useMemo(
		() =>
			data?.menus.list.map((o) => ({
				key: o.seqNo,

				...o,
			})),
		[data]
	);
	return (
		<Table
			size={"small"}
			loading={loading}
			columns={columns}
			dataSource={dataSource}
		/>
	);
};

export default FrmkMnMgmt;
