import { useQueryObj } from "@src/hooks";
import { SortQueryKeyMapType, SortQueryObjType, UtilTable } from "@src/Util";
import { useMentionsState } from "@src/hooks/useMentionsState";
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
import { usePaging } from "@src/hooks/usePaging";
import { Button, Drawer, Form, Layout, message, Space, Table } from "antd";
import React, { FC, useCallback, useMemo, useState } from "react";
import { Index } from "src/component/form/MsgForm";
import { useMutation, useQuery } from "@apollo/client";
import { UtilRefetch } from "@src/Util/Util.refetch";
import { invert, mapValues, pick } from "lodash";
import { Nullable } from "@src/types";
import { ColumnsType } from "antd/es/table";
import { MsgDesc } from "@src/component/descriptions/MsgDesc";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { MESSAGE_ENTITIES_TABLE_QUERY } from "@src/component/route/FrmkMsgMgmt";
import { CustomFormActionType } from "@src/types/table";

export interface EntityTableProps<
	Output extends object,
	SortQueryKeyMap extends SortQueryKeyMapType
> {
	Mentions: FC;
	Form: FC;
	sortQueryKeyMap: SortQueryKeyMap;
}
export function EntityTable<
	Output extends object,
	SortQueryKeyMap extends SortQueryKeyMapType
>({ sortQueryKeyMap }: EntityTableProps<Output, SortQueryKeyMap>) {
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj<Partial<SortQueryObjType>>();

	const { mentionsShowYn, record, setMentionsShowYn, setRecord } =
		useMentionsState<Output>();

	const { makeSkip, pagingInput, setPagingInput, current, setTake } =
		usePaging(10);
	const [form] = Form.useForm<Output>();
	const [formDrawerOpenYn, setFormDrawerOpenYn] = useState(false);
	const [actionType, setActionType] = useState<CustomFormActionType>();
	const [messageApi, contextHolder] = message.useMessage();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, sortQueryKeyMap),
		[queryObj]
	);

	const { data, loading, previousData } = useQuery<
		{
			messageEntities: MessageEntitiesOutput;
		},
		{
			paging?: PagingInput;
			param?: MessageEntitiesInput;
		}
	>(MESSAGE_ENTITIES_TABLE_QUERY, {
		variables: {
			paging: pagingInput,
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
			await UtilRefetch.message();
		},
	});

	const [insertMessageEntityMutate] = useMutation<
		MessageEntityOutput,
		{
			input: InsertMessageEntityInput;
		}
	>(INSERT_MESSAGE_ENTITY, {
		async onCompleted() {
			await UtilRefetch.message();
		},
	});
	const changeSort = useCallback(
		(queryKey: keyof MessageEntitiesSortInput) => {
			const sortKey = invert(msgMgmtQryObj)[queryKey] as Nullable<
				keyof MsgMgmtQryObj
			>;

			if (sortKey) {
				const t = mapValues(
					pick(queryObj, Object.keys(msgMgmtQryObj)),
					UtilTable.toSortTypeInput.bind(UtilTable)
				);
				Object.keys(t).forEach(searchParams.delete.bind(searchParams));
				const a = (
					Object.entries(t) as Array<
						[keyof MsgMgmtQryObj, Nullable<SortTypeInput>]
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
			<Drawer onClose={() => setMentionsShowYn(false)} open={mentionsShowYn}>
				<MsgDesc record={record} />
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
													desc: record.desc,
												},
											},
										});

										await UtilRefetch.message();
										break;
									case "update":
										await updateMessageEntityMutate({
											variables: {
												input: {
													seqNo: record.seqNo,
													name: record.name,
													text: record.text,
													desc: record.desc,
												},
											},
										});
										await UtilRefetch.message();
										break;
								}
								setFormDrawerOpenYn(false);
								await messageApi.success("성공");
							}}
						>
							저장
						</Button>
					</Space>
				}
			>
				<Index form={form} actionType={actionType} />
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
								UtilRefetch.message();
							}}
						/>
					</Space>
				</Layout.Header>
				<Layout.Content>
					<Table
						bordered
						pagination={{
							showSizeChanger: true,
							pageSizeOptions: [10, 20, 50],
							onShowSizeChange: (_, take) => setTake(take),
							pageSize: pagingInput.take,
							current,
							total: data?.messageEntities.total,
							onChange(page, take) {
								setPagingInput({
									take,
									skip: makeSkip(page),
								});
							},
						}}
						loading={loading}
						columns={columns}
						rowKey={"seqNo"}
						dataSource={
							data?.messageEntities.list || previousData?.messageEntities.list
						}
						onRow={(value) => ({
							onClick: () => {
								setRecord(value);
								setMentionsShowYn(true);
							},
						})}
					/>
				</Layout.Content>
			</Layout>
		</>
	);
}
