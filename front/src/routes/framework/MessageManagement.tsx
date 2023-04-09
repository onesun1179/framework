import { FC, useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ColumnType } from "antd/es/table";
import { MenusRequest, Message, PagedMessages, PagingRequest } from "@gqlType";
import { Table } from "antd";
import EditableRow from "@src/component/EditableRow";

const QUERY = gql`
	query ($paging: PagingRequest, $param: MessagesRequest) {
		messages(paging: $paging, request: $param) {
			list {
				groupCode
				code
				text
				seqNo
				createdAt
				updatedAt
				desc
			}
			total
		}
	}
`;

const columns: Array<
	ColumnType<Message> & {
		editable?: boolean;
	}
> = [
	{ title: "일련번호", dataIndex: "seqNo", key: "seqNo" },
	{ title: "그룹코드", dataIndex: "groupCode", key: "groupCode" },
	{ title: "코드", dataIndex: "code", key: "code" },
	{ title: "메세지", dataIndex: "text", key: "text" },
	{ title: "생성일자", dataIndex: "createdAt", key: "createdAt" },
	{ title: "수정일자", dataIndex: "updatedAt", key: "updatedAt" },
	{ title: "비고", dataIndex: "desc", key: "desc" },
];

const MessageManagement: FC = () => {
	console.log(123);
	const [pageSize, setPageSize] = useState(10);

	const { data, loading } = useQuery<
		{
			messages: PagedMessages;
		},
		{
			paging?: PagingRequest;
			param?: MenusRequest;
		}
	>(QUERY, {
		variables: {
			paging: {
				skip: 0,
				take: pageSize,
			},
			param: {},
		},
	});

	console.log(data);
	const dataSource = useMemo(
		() =>
			data?.messages.list.map((o) => ({
				key: o.seqNo,

				...o,
			})),
		[data]
	);
	return (
		<Table
			pagination={{ pageSize }}
			components={{
				body: {
					row: EditableRow,
					// cell: EditableCell,
				},
			}}
			size={"small"}
			loading={loading}
			columns={columns}
			dataSource={dataSource}
			scroll={{
				y: 240,
			}}
		/>
	);
};

export default MessageManagement;
