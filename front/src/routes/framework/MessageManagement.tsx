import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
	MessageEntitiesInput,
	MessageEntitiesOutput,
	MessageEntityOutput,
	PagingInput,
	UpdateMessageEntityInput,
} from "@gqlType";
import {
	EditableActionButtonCell,
	EditableCell,
	EditableColumns,
	EditableRow,
	EditableTable,
} from "@src/component/table/editable";
import { cloneDeep } from "lodash";
import { Button, Layout, message } from "antd";
// import { Builder } from "builder-pattern";

const UPDATE_MESSAGE_ENTITY = gql`
	mutation ($updateMessageEntityInput: UpdateMessageEntityInput!) {
		updateMessageEntity(updateMessageEntityInput: $updateMessageEntityInput) {
			seqNo
		}
	}
`;
const QUERY = gql`
	query ($paging: PagingInput, $param: MessageEntitiesInput) {
		messageEntities(pagingInput: $paging, messageEntitiesInput: $param) {
			list {
				seqNo
				name
				text
				code
				groupCode
				sysYn
				createdAt
				updatedAt
				desc
			}
			total
		}
		messageGroupEntities {
			list {
				code
				name
			}
		}
	}
`;

const MessageManagement: FC = () => {
	const [pageSize, setPageSize] = useState(10);
	const [messageApi, contextHolder] = message.useMessage();
	const [dataSource, setDataSource] = useState<Array<MessageEntityOutput>>();
	const setRecord = useCallback(
		(record: MessageEntityOutput) => {
			setDataSource((prev) => {
				const _prev = cloneDeep(prev);
				_prev![_prev!.findIndex((o) => o.seqNo === record.seqNo)] = record;
				return _prev;
			});
		},
		[dataSource]
	);
	const { data, loading, refetch } = useQuery<
		{
			messageEntities: MessageEntitiesOutput;
		},
		{
			paging?: PagingInput;
			param?: MessageEntitiesInput;
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
	const [updateMessageEntityMutate, { data: mudateData }] = useMutation<
		MessageEntityOutput,
		{
			updateMessageEntityInput: UpdateMessageEntityInput;
		}
	>(UPDATE_MESSAGE_ENTITY, {
		async onCompleted() {
			await refetch();
		},
	});

	const initialDataSource = useMemo<MessageEntityOutput[] | undefined>(
		() =>
			data?.messageEntities.list.map((o) => ({
				key: o.seqNo,
				...o,
			})),
		[data]
	);

	const getInitialRecord = useCallback(
		(record: MessageEntityOutput) =>
			initialDataSource!.find((o) => o.seqNo === record.seqNo)!,
		[initialDataSource]
	);

	const updateRow = useCallback(
		(record: MessageEntityOutput) => {
			updateMessageEntityMutate({
				variables: {
					updateMessageEntityInput: {
						code: record.code,
						text: record.text,
						name: record.name,
						groupCode: record.groupCode,
						seqNo: record.seqNo,
					},
				},
			}).then(() => {
				messageApi.info("저장");
			});
		},
		[messageApi]
	);

	const addRow = useCallback(() => {
		setDataSource((prev) => [
			...prev!,
			{
				groupCode
				sysYn: false,
			} 
		]);
	}, [setDataSource]);
	const columns = useMemo<EditableColumns<MessageEntityOutput>>(
		() => [
			{
				title: "ID",
				dataIndex: "seqNo",
				key: "seqNo",
				width: 40,
				align: "center",
			},
			{
				title: "이름",
				dataIndex: "name",
				key: "name",
				onCell: (record) => ({
					record,
					initialRecord: getInitialRecord(record),
					edit: {
						type: "string",
						rules: [
							{
								required: true,
							},
						],
					},

					dataIndex: "name",
					handleSave: setRecord,
				}),
			},
			{
				title: "그룹코드",
				dataIndex: "groupCode",
				key: "groupCode",
				width: 70,
			},
			{
				title: "코드",
				dataIndex: "code",
				key: "code",
				width: 80,
				onCell: (record) => ({
					record,
					initialRecord: getInitialRecord(record),
					edit: {
						type: "string",
					},
					dataIndex: "code",
					handleSave: setRecord,
				}),
			},
			{
				title: "메세지",
				dataIndex: "text",
				key: "text",
				onCell: (record) => ({
					record,
					initialRecord: getInitialRecord(record),
					edit: {
						type: "string",
					},
					dataIndex: "text",
					handleSave: setRecord,
				}),
			},
			// { title: "생성일자", dataIndex: "createdAt", key: "createdAt" },
			{
				title: "시스템 여부",
				dataIndex: "sysYn",
				key: "sysYn",
				align: "center",
				render: (value, record, index) => {
					console.log(value);
					return value ? "Y" : "N";
				},
			},
			{
				title: "비고",
				dataIndex: "desc",
				key: "desc",
				width: 50,
				onCell: (record) => ({
					record,
					initialRecord: getInitialRecord(record),
					edit: {
						type: "string",
					},
					dataIndex: "desc",
					handleSave: setRecord,
				}),
			},
			{
				title: "액션",
				dataIndex: "action",
				key: "action",
				width: 150,
				cellType: "action",
				render: (value, record, index) => (
					<EditableActionButtonCell onUpdateClick={() => updateRow(record)} />
				),
			},
		],
		[dataSource, setRecord, getInitialRecord, updateRow]
	);

	useEffect(() => {
		setDataSource(initialDataSource);
	}, [initialDataSource]);

	return (
		<>
			{contextHolder}
			<Layout>
				<Layout.Header>
					<Button onClick={addRow}>행 추가</Button>
				</Layout.Header>
				<Layout.Content>
					<EditableTable
						pagination={{ pageSize }}
						components={{
							body: {
								row: EditableRow,
								cell: EditableCell,
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
				</Layout.Content>
			</Layout>
		</>
	);
};

export default MessageManagement;
