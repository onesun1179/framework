/**
 * 프레임워크 메뉴 관리
 */
import React, { FC, memo, useMemo, useState } from "react";
import { Button, Drawer, Form, Layout, message, Space, Table } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";

import { ColumnsType, ColumnType } from "antd/es/table";
import { useQueryObj } from "@src/hooks";
import {
	refetchQueryMap,
	SearchQueryKeyType,
	SortQueryKeyType,
	UtilTable,
} from "@src/Util";
import { UtilRefetch } from "@src/Util/Util.refetch";
import { usePaging } from "@src/hooks/usePaging";
import { useMentionsState } from "@src/hooks/useMentionsState";
import { useQrySort } from "@src/hooks/useQrySort";
import { useFrmkMsgMgmtData } from "@src/component/route/FrmkMsgMgmt/quires";
import { EntityFormActionType } from "@src/types";
import MessageEntityForm from "@src/component/form/MsgForm";
import {
	MessageOutput,
	MessagesSearchInput,
	MessagesSortInput,
} from "@gqlType";
import {
	useInsertMessage,
	useUpdateMessage,
} from "@src/component/route/FrmkMsgMgmt/mutations";
import MsgDesc from "@src/component/descriptions/MsgDesc";

type SrtQryKey = SortQueryKeyType<
	"nm" | "cd" | "gpcd" | "msg" | "no" | "desc" | "cat" | "uat"
>;
const srtQryMap: Record<SrtQryKey, keyof MessagesSortInput> = {
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
const srchQryMap: Record<SrchQryKey, keyof MessagesSearchInput> = {
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
		useMentionsState<MessageOutput>();
	const { getColumnSort } = useQrySort(srtQryMap);
	const { makeSkip, pagingInput, setPagingInput, current, setTake } =
		usePaging(10);
	const [form] = Form.useForm<MessageOutput>();
	const [formDrawerOpenYn, setFormDrawerOpenYn] = useState(false);
	const [actionType, setActionType] = useState<EntityFormActionType>();
	const [messageApi, contextHolder] = message.useMessage();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);

	const searchInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);

	const { data, loading, previousData } = useFrmkMsgMgmtData({
		variables: {
			paging: pagingInput,
			param: {
				sort: sortInputType,
			},
		},
	});
	const [updateMessageMutate] = useUpdateMessage({
		refetchQueries: refetchQueryMap.message,
	});

	const [insertMessageMutate] = useInsertMessage({
		refetchQueries: refetchQueryMap.message,
	});

	const columns: ColumnsType<MessageOutput> = useMemo(
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
						key: "desc",
						dataIndex: "desc",
						title: "비고",
						width: 80,
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
				] as Array<ColumnType<MessageOutput>>
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
										await insertMessageMutate({
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
										await updateMessageMutate({
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
							total: data?.messages.total,
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
						dataSource={data?.messages.list || previousData?.messages.list}
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

export default memo(FrmkMsgMgmt);
