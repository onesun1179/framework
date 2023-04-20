import React, { FC, useCallback, useMemo, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
	InsertMessageEntityInput,
	MessageEntitiesInput,
	MessageEntitiesOutput,
	MessageEntitiesSortInput,
	MessageEntityOutput,
	PagingInput,
	SortEnum,
	SortTypeInput,
	UpdateMessageEntityInput,
} from "@gqlType";
import { Button, Drawer, Form, Layout, message, Space, Table } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import {
	MessageEntityForm,
	MessageEntityFormActionType,
} from "@src/component/form/MessageEntityForm";
import { MessageEntityDescriptions } from "@src/component/descriptions/MessageEntityDescriptions";
import { ColumnsType } from "antd/es/table";
import { useQueryObj } from "@src/hooks";
import { SortQueryKeyMapType, SortQueryObjType, UtilTable } from "@src/Util";
import { invert, mapValues, pick } from "lodash";
import { Nullable } from "@src/types";

const UPDATE_MESSAGE_ENTITY = gql`
	mutation UPDATE_MESSAGE_ENTITY($input: UpdateMessageEntityInput!) {
		updateMessageEntity(updateMessageEntityInput: $input) {
			seqNo
		}
	}
`;

const INSERT_MESSAGE_ENTITY = gql`
	mutation INSERT_MESSAGE_ENTITY($input: InsertMessageEntityInput!) {
		insertMessageEntity(insertMessageEntityInput: $input) {
			seqNo
		}
	}
`;
const MESSAGE_ENTITIES_QUERY = gql`
	query MESSAGE_ENTITIES_QUERY(
		$paging: PagingInput
		$param: MessageEntitiesInput
	) {
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
	}
`;

type MessageManagementQueryObj = SortQueryKeyMapType<
	| "sort_nm"
	| "sort_cd"
	| "sort_gpcd"
	| "sort_msg"
	| "sort_no"
	| "sort_desc"
	| "sort_cat"
	| "sort_uat",
	keyof MessageEntitiesSortInput
>;
const messageManagementQueryObj: MessageManagementQueryObj = {
	sort_gpcd: "groupCode",
	sort_cd: "code",
	sort_msg: "text",
	sort_nm: "name",
	sort_no: "seqNo",
	sort_desc: "desc",
	sort_cat: "createdAt",
	sort_uat: "updatedAt",
};

const MessageManagement: FC = () => {
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj<Partial<SortQueryObjType>>();
	const [record, setRecord] = useState<MessageEntityOutput>();

	const [pageSize, setPageSize] = useState(10);
	const [form] = Form.useForm<MessageEntityOutput>();
	const [formDrawerOpenYn, setFormDrawerOpenYn] = useState(false);
	const [actionType, setActionType] = useState<MessageEntityFormActionType>();
	const [messageApi, contextHolder] = message.useMessage();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, messageManagementQueryObj),
		[queryObj]
	);

	const { data, loading, refetch, previousData } = useQuery<
		{
			messageEntities: MessageEntitiesOutput;
		},
		{
			paging?: PagingInput;
			param?: MessageEntitiesInput;
		}
	>(MESSAGE_ENTITIES_QUERY, {
		variables: {
			paging: {
				skip: 0,
				take: pageSize,
			},
			param: {
				sort: sortInputType,
			},
		},
	});
	const [updateMessageEntityMutate] = useMutation<
		MessageEntityOutput,
		{
			input: UpdateMessageEntityInput;
		}
	>(UPDATE_MESSAGE_ENTITY, {
		async onCompleted() {
			await refetch();
		},
	});

	const [insertMessageEntityMutate] = useMutation<
		MessageEntityOutput,
		{
			input: InsertMessageEntityInput;
		}
	>(INSERT_MESSAGE_ENTITY, {
		async onCompleted() {
			await refetch();
		},
	});
	const changeSort = useCallback(
		(queryKey: keyof MessageEntitiesSortInput) => {
			const sortKey = invert(messageManagementQueryObj)[queryKey] as Nullable<
				keyof MessageManagementQueryObj
			>;

			if (sortKey) {
				const t = mapValues(
					pick(queryObj, Object.keys(messageManagementQueryObj)),
					UtilTable.toSortTypeInput.bind(UtilTable)
				);
				Object.keys(t).forEach(searchParams.delete.bind(searchParams));
				const a = (
					Object.entries(t) as Array<
						[keyof MessageManagementQueryObj, Nullable<SortTypeInput>]
					>
				)
					.filter((o) => !!o[1] && o[0] !== sortKey)
					.sort((a, b) => {
						return a[1]!.order - b[1]!.order;
					})
					.map((o, i) => {
						o[1]!.order = i + 1;
						return o;
					});

				const maxOrder = Math.max(...[...a.map((o) => o[1]!.order), 0]);

				switch (t[sortKey]?.sort) {
					case "ASC":
						a.push([
							sortKey,
							{
								sort: SortEnum.DESC,
								order: maxOrder + 1,
							},
						]);
						break;
					case "DESC":
						break;
					default:
						a.push([
							sortKey,
							{
								sort: SortEnum.ASC,
								order: maxOrder + 1,
							},
						]);
						break;
				}

				a.forEach(([k, v]) => {
					const query = UtilTable.toSortQueryValue(v);
					console.log(k, query);
					query && searchParams.set(k, query);
				});
				setSearchParams(searchParams);
			}
		},
		[searchParams, queryObj]
	);

	const columns: ColumnsType<MessageEntityOutput> = useMemo(
		() =>
			UtilTable.makeColumns<MessageEntityOutput, typeof sortInputType>(
				[
					{
						key: "seqNo",
						width: 20,
						align: "center",
					},
					{
						key: "name",
					},
					{
						key: "groupCode",
						width: 110,
						align: "center",
					},
					{
						key: "code",
						width: 80,
						align: "center",
					},
					{
						key: "text",
					},
					{
						key: "desc",
						width: 80,
					},
					{
						key: "createdAt",
						width: 220,
					},
					{ key: "updatedAt", width: 220 },
					{
						key: "action",
						width: 100,
						render(value, record, index) {
							return (
								<Space>
									<Button
										onClick={(e) => {
											e.stopPropagation();
											setActionType("update");
											setFormDrawerOpenYn(true);
											form.setFieldsValue(record);
										}}
									>
										수정
									</Button>

									<Button
										onClick={(e) => {
											e.stopPropagation();
											setActionType("insert");
											setFormDrawerOpenYn(true);
											form.setFieldsValue(record);
										}}
									>
										복사
									</Button>
								</Space>
							);
						},
					},
				],
				{
					seqNo: "ID",
					code: "코드",
					text: "메세지",
					groupCode: "그룹코드",
					name: "이름",
					desc: "비고",
					createdAt: "생성일자",
					updatedAt: "수정일자",
					action: "액션",
				},
				{
					sort: {
						map: sortInputType,
						change: changeSort,
					},
				}
			),
		[
			queryObj,
			record,
			setActionType,
			setFormDrawerOpenYn,
			form,
			changeSort,
			sortInputType,
		]
	);

	return (
		<>
			{contextHolder}
			<Drawer onClose={() => setRecord(undefined)} open={!!record}>
				<MessageEntityDescriptions record={record} />
			</Drawer>

			<Drawer
				open={formDrawerOpenYn}
				onClose={() => setFormDrawerOpenYn(false)}
				afterOpenChange={(open) => !open && setActionType(undefined)}
				extra={
					<Space>
						<Button
							type="primary"
							onClick={async () => {
								await form.validateFields();
								const record = form.getFieldsValue();
								switch (actionType) {
									case "insert":
										await insertMessageEntityMutate({
											variables: {
												input: {
													groupCode: record.groupCode,
													name: record.name,
													text: record.text,
													code: record.code,
												},
											},
										});
										await refetch();
										break;
									case "update":
										await updateMessageEntityMutate({
											variables: {
												input: {
													seqNo: record.seqNo,
													groupCode: record.groupCode,
													name: record.name,
													text: record.text,
													code: record.code,
												},
											},
										});
										await refetch();
										break;
								}

								await messageApi.success("성공");
							}}
						>
							저장
						</Button>
					</Space>
				}
			>
				<MessageEntityForm form={form} actionType={actionType} />
			</Drawer>

			<Layout>
				<Layout.Header>
					<Space>
						<Button
							icon={<PlusOutlined />}
							type={"primary"}
							onClick={() => {
								form.resetFields();
								setFormDrawerOpenYn(true);
								setActionType("insert");
							}}
						/>
						<Button
							icon={<ReloadOutlined />}
							type={"primary"}
							onClick={() => {
								refetch();
							}}
						/>
					</Space>
				</Layout.Header>
				<Layout.Content>
					<Table
						bordered
						pagination={{ pageSize }}
						loading={loading}
						columns={columns}
						rowKey={"seqNo"}
						dataSource={
							data?.messageEntities.list || previousData?.messageEntities.list
						}
						onRow={(value) => ({
							onClick: () => setRecord(value),
						})}
					/>
				</Layout.Content>
			</Layout>
		</>
	);
};

export default MessageManagement;
