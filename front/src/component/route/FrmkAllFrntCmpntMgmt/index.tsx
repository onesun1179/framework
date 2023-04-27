import React, { FC, memo, useMemo, useState } from "react";
import {
	refetchQueryMap,
	SearchQueryKeyType,
	SortQueryKeyType,
	UtilTable,
} from "@src/Util";
import {
	AllFrontComponentEntitiesSearchInput,
	AllFrontComponentEntitiesSortInput,
	AllFrontComponentEntityOutput,
	MessageGroupEntityOutput,
} from "@gqlType";
import { Button, Drawer, Form, Layout, message, Space, Table } from "antd";
import { useQueryObj } from "@src/hooks";
import { useQrySort } from "@src/hooks/useQrySort";
import { useMentionsState } from "@src/hooks/useMentionsState";
import { usePaging } from "@src/hooks/usePaging";
import { EntityFormActionType } from "@src/types";
import { ColumnType } from "antd/es/table";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { AllFrontComponentEntityDescriptions } from "@src/component/descriptions/AllFrontComponentEntityDescriptions";

import AllFrontComponentEntityForm from "@src/component/form/AllFrontComponentEntityForm";
import { useAllFrmkFrntCmpntMgmtData } from "@src/component/route/FrmkAllFrntCmpntMgmt/quires";
import {
	useInsertAllFrontComponent,
	useUpdateAllFrontComponent,
} from "@src/component/route/FrmkAllFrntCmpntMgmt/mutations";

/**
 * 프레임워크 컴포넌트 관리
 */

type SrtQryKey = SortQueryKeyType<"id" | "fcId" | "desc" | "cat" | "uat">;
const srtQryMap: Record<SrtQryKey, keyof AllFrontComponentEntitiesSortInput> = {
	sort_id: "id",
	sort_fcId: "frontComponentId",
	sort_desc: "desc",
	sort_cat: "createdAt",
	sort_uat: "updatedAt",
};
type SrchQryKey = SearchQueryKeyType<"id" | "fcId">;
const srchQryMap: Record<
	SrchQryKey,
	keyof AllFrontComponentEntitiesSearchInput
> = {
	srch_id: "id",
	srch_fcId: "frontComponentId",
};

type QryObj = typeof srtQryMap & typeof srchQryMap;
const qryObj: QryObj = {
	...srtQryMap,
	...srchQryMap,
};

const FrmkFrntCmpntMgmt: FC = () => {
	const [form] = Form.useForm<AllFrontComponentEntityOutput>();
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj<Partial<QryObj>>();
	const { getColumnSort } = useQrySort(srtQryMap);

	const { mentionsShowYn, record, setMentionsShowYn, setRecord } =
		useMentionsState<AllFrontComponentEntityOutput>();

	const { makeSkip, pagingInput, setPagingInput, current, setTake } =
		usePaging();

	const [formDrawerOpenYn, setFormDrawerOpenYn] = useState(false);
	const [actionType, setActionType] = useState<EntityFormActionType>();
	const [messageApi, contextHolder] = message.useMessage();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);
	const { data, loading, previousData } = useAllFrmkFrntCmpntMgmtData();
	const [updateAllFrontComponent] = useUpdateAllFrontComponent({
		refetchQueries: refetchQueryMap.allFrontComponent,
	});
	const [insertAllFrontComponent] = useInsertAllFrontComponent({
		refetchQueries: refetchQueryMap.allFrontComponent,
	});

	const columns = useMemo(
		() =>
			(
				[
					{
						key: "id",
						dataIndex: "id",
						title: "ID",
					},
					{
						key: "frontComponentId",
						dataIndex: "frontComponentId",
						title: "화면 컴포넌트 ID",
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
				<AllFrontComponentEntityDescriptions record={record} />
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
										await insertAllFrontComponent({
											variables: {
												input: {
													id: record.id,
													frontComponentId: record.frontComponentId,
													desc: record.desc,
												},
											},
										});
										break;
									case "update":
										await updateAllFrontComponent({
											variables: {
												input: {
													id: record.id,
													frontComponentId: record.frontComponentId,
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
				<AllFrontComponentEntityForm form={form} actionType={actionType} />
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
						<Button icon={<ReloadOutlined />} type={"primary"} />
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
							total: data?.allFrontComponentEntities.total,
							onChange(page, take) {
								setPagingInput({
									take,
									skip: makeSkip(page),
								});
							},
						}}
						loading={loading}
						columns={columns}
						rowKey={"id"}
						dataSource={
							data?.allFrontComponentEntities.list ||
							previousData?.allFrontComponentEntities.list
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

export default memo(FrmkFrntCmpntMgmt);