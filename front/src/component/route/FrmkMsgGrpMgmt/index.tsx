import React, { FC, memo, useMemo, useState } from "react";
import {
	refetchQueryMap,
	SearchQueryKeyType,
	SortQueryKeyType,
	UtilRefetch,
	UtilTable,
} from "@src/Util";
import {
	MessageGroupEntitiesSearchInput,
	MessageGroupEntitiesSortInput,
	MessageGroupEntityOutput,
} from "@gqlType";
import { useQueryObj } from "@src/hooks";
import { usePaging } from "@src/hooks/usePaging";
import { Button, Drawer, Form, Layout, message, Space, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { MessageGroupEntityDescriptions } from "@src/component/descriptions/MessageGroupEntityDescriptions";
import { MessageGroupEntityForm } from "@src/component/form/MessageGroupEntityForm";
import { useMentionsState } from "@src/hooks/useMentionsState";
import { useQrySort } from "@src/hooks/useQrySort";
import { EntityFormActionType } from "@src/types";
import { useFrmkMsgGrkMgmtData } from "@src/component/route/FrmkMsgGrpMgmt/quires";
import {
	useInsertMessageGroupEntity,
	useUpdateMessageGroupEntity,
} from "@src/component/route/FrmkMsgGrpMgmt/mutations";

/**
 * 프레임워크 메뉴 그룹 관리
 */

type SrtQryKey = SortQueryKeyType<"nm" | "cd" | "desc" | "cat" | "uat">;
const srtQryMap: Record<SrtQryKey, keyof MessageGroupEntitiesSortInput> = {
	sort_cd: "code",
	sort_nm: "name",
	sort_desc: "desc",
	sort_cat: "createdAt",
	sort_uat: "updatedAt",
};
type SrchQryKey = SearchQueryKeyType<"nm" | "cd">;
const srchQryMap: Record<SrchQryKey, keyof MessageGroupEntitiesSearchInput> = {
	srch_nm: "name",
	srch_cd: "code",
};

type QryObj = typeof srtQryMap & typeof srchQryMap;
const qryObj: QryObj = {
	...srtQryMap,
	...srchQryMap,
};

const FrmkMsgGrpMgmt: FC = () => {
	const [form] = Form.useForm<MessageGroupEntityOutput>();
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj<Partial<QryObj>>();
	const { getColumnSort } = useQrySort(srtQryMap);

	const { mentionsShowYn, record, setMentionsShowYn, setRecord } =
		useMentionsState<MessageGroupEntityOutput>();

	const { makeSkip, pagingInput, setPagingInput, current, setTake } =
		usePaging();

	const [formDrawerOpenYn, setFormDrawerOpenYn] = useState(false);
	const [actionType, setActionType] = useState<EntityFormActionType>();
	const [messageApi, contextHolder] = message.useMessage();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);
	const { data, loading, previousData } = useFrmkMsgGrkMgmtData({
		variables: {
			paging: pagingInput,
			param: {
				sort: sortInputType,
			},
		},
	});

	const [updateMessageGroupEntityMutate] = useUpdateMessageGroupEntity({
		refetchQueries: refetchQueryMap.messageGroup,
	});

	const [insertMessageGroupEntityMutate] = useInsertMessageGroupEntity({
		refetchQueries: refetchQueryMap.messageGroup,
	});

	const columns = useMemo(
		() =>
			(
				[
					{
						key: "name",
						dataIndex: "name",
						title: "이름",
					},
					{
						key: "code",
						dataIndex: "code",
						title: "코드",
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
				] as Array<ColumnType<MessageGroupEntityOutput>>
			).map((o) => {
				return {
					...o,
					...getColumnSort(o),
				};
			}),
		[setActionType, setFormDrawerOpenYn, form, srtQryMap, getColumnSort]
	);

	return (
		<>
			{contextHolder}
			<Drawer onClose={() => setMentionsShowYn(false)} open={mentionsShowYn}>
				<MessageGroupEntityDescriptions record={record} />
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
										await insertMessageGroupEntityMutate({
											variables: {
												input: {
													name: record.name,
													code: record.code,
													desc: record.desc,
												},
											},
										});

										break;
									case "update":
										console.log(record);
										await updateMessageGroupEntityMutate({
											variables: {
												input: {
													name: record.name,
													code: record.code,
													desc: record.desc,
												},
											},
										});
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
				<MessageGroupEntityForm form={form} actionType={actionType} />
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
							total: data?.messageGroupEntities.total,
							onChange(page, take) {
								setPagingInput({
									take,
									skip: makeSkip(page),
								});
							},
						}}
						loading={loading}
						columns={columns}
						rowKey={"code"}
						dataSource={
							data?.messageGroupEntities.list ||
							previousData?.messageGroupEntities.list
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

export default memo(FrmkMsgGrpMgmt);