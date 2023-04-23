/**
 * 프레임워크 메뉴 관리
 */
import React, { FC, useMemo, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
	InsertMessageEntityInput,
	MessageEntitiesInput,
	MessageEntitiesOutput,
	MessageEntitiesSearchInput,
	MessageEntitiesSortInput,
	MessageEntityOutput,
	PagingInput,
	UpdateMessageEntityInput,
} from "@gqlType";
import { Button, Drawer, Form, Layout, message, Space, Table } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import {
	MessageEntityForm,
	MessageEntityFormActionType,
} from "@src/component/form/MessageEntityForm";
import { MessageEntityDescriptions } from "@src/component/descriptions/MessageEntityDescriptions";
import { ColumnsType, ColumnType } from "antd/es/table";
import { useQueryObj } from "@src/hooks";
import { SearchQueryKeyType, SortQueryKeyType, UtilTable } from "@src/Util";
import { UtilRefetch } from "@src/Util/Util.refetch";
import { usePaging } from "@src/hooks/usePaging";
import { useMentionsState } from "@src/hooks/useMentionsState";
import { useQrySort } from "@src/hooks/useQrySort";

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
export const MESSAGE_ENTITIES_TABLE_QUERY = gql`
	query MESSAGE_ENTITIES_TABLE_QUERY(
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
				createdAt
				updatedAt
				desc
			}
			total
		}
	}
`;

type SrtQryKey = SortQueryKeyType<
	"nm" | "cd" | "gpcd" | "msg" | "no" | "desc" | "cat" | "uat"
>;
const srtQryMap: Record<SrtQryKey, keyof MessageEntitiesSortInput> = {
	sort_gpcd: "groupCode",
	sort_cd: "code",
	sort_msg: "text",
	sort_nm: "name",
	sort_no: "seqNo",
	sort_desc: "desc",
	sort_cat: "createdAt",
	sort_uat: "updatedAt",
};
type SrchQryKey = SearchQueryKeyType<"nm" | "no" | "gpcd" | "msg">;
const srchQryMap: Record<SrchQryKey, keyof MessageEntitiesSearchInput> = {
	srch_no: "seqNo",
	srch_msg: "text",
	srch_nm: "name",
	srch_gpcd: "groupCode",
};
type QryObj = typeof srtQryMap & typeof srchQryMap;
const qryObj: QryObj = {
	...srtQryMap,
	...srchQryMap,
};

const FrmkMsgMgmt: FC = () => {
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj<Partial<QryObj>>();

	const { mentionsShowYn, record, setMentionsShowYn, setRecord } =
		useMentionsState<MessageEntityOutput>();
	const { getColumnSort } = useQrySort(srtQryMap);
	const { makeSkip, pagingInput, setPagingInput, current, setTake } =
		usePaging(10);
	const [form] = Form.useForm<MessageEntityOutput>();
	const [formDrawerOpenYn, setFormDrawerOpenYn] = useState(false);
	const [actionType, setActionType] = useState<MessageEntityFormActionType>();
	const [messageApi, contextHolder] = message.useMessage();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);

	const searchInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
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

	const columns: ColumnsType<MessageEntityOutput> = useMemo(
		() =>
			(
				[
					{
						key: "seqNo",
						dataIndex: "seqNo",
						title: "ID",
						width: 20,
						align: "center",
					},
					{
						key: "name",
						dataIndex: "name",
						title: "이름",
					},
					{
						key: "groupCode",
						dataIndex: "groupCode",
						title: "그룹 코드",
						width: 110,
						align: "center",
					},
					{
						key: "code",
						dataIndex: "code",
						title: "코드",
						width: 80,
						align: "center",
					},
					{
						key: "text",
						dataIndex: "text",
						title: "메세지",
					},
					{
						key: "desc",
						dataIndex: "desc",
						title: "비고",
						width: 80,
					},
					{
						key: "createdAt",
						dataIndex: "createdAt",
						title: "생성일자",
						width: 220,
					},
					{
						key: "updatedAt",
						dataIndex: "updatedAt",
						title: "수정일자",
						width: 220,
					},
					{
						key: "action",
						dataIndex: "action",
						title: "액션",
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
				] as Array<ColumnType<MessageEntityOutput>>
			).map((o) => {
				return {
					...o,
					...getColumnSort(o),
				};
			}),
		[queryObj, record, setActionType, setFormDrawerOpenYn, form, getColumnSort]
	);

	return (
		<>
			{contextHolder}
			<Drawer onClose={() => setMentionsShowYn(false)} open={mentionsShowYn}>
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
};

export default FrmkMsgMgmt;
