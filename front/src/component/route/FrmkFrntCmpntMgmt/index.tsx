import React, { FC, memo, useMemo, useState } from "react";
import {
	refetchQueryMap,
	SearchQueryKeyType,
	SortQueryKeyType,
	UtilTable,
} from "@src/Util";
import { Button, Drawer, Form, Layout, message, Space, Table } from "antd";
import { useQueryObj } from "@src/hooks";
import { useQrySort } from "@src/hooks/useQrySort";
import { useMentionsState } from "@src/hooks/useMentionsState";
import { usePaging } from "@src/hooks/usePaging";
import { EntityFormActionType } from "@src/types";
import { ColumnType } from "antd/es/table";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { FrontComponentEntityDescriptions } from "@src/component/descriptions/FrontComponentEntityDescriptions";
import FrontComponentEntityForm from "@src/component/form/FrontComponentEntityForm";
import {
	FrontComponentOutput,
	FrontComponentsSearchInput,
	FrontComponentsSortInput,
} from "@gqlType";
import { useFrmkFrntCmpntMgmtQuery } from "@src/component/route/FrmkFrntCmpntMgmt/quires";
import { useUpdateFrontComponentMutation } from "@src/component/route/FrmkFrntCmpntMgmt/mutations";

/**
 * 프레임워크 컴포넌트 관리
 */

type SrtQryKey = SortQueryKeyType<"id" | "nm" | "desc" | "cat" | "uat">;
const srtQryMap: Record<SrtQryKey, keyof FrontComponentsSortInput> = {
	sort_id: "id",
	sort_nm: "name",
	sort_desc: "desc",
	sort_cat: "createdAt",
	sort_uat: "updatedAt",
};
type SrchQryKey = SearchQueryKeyType<"id" | "nm">;
const srchQryMap: Record<SrchQryKey, keyof FrontComponentsSearchInput> = {
	srch_id: "id",
	srch_nm: "name",
};

type QryObj = typeof srtQryMap & typeof srchQryMap;
const qryObj: QryObj = {
	...srtQryMap,
	...srchQryMap,
};

const FrmkFrntCmpntMgmt: FC = () => {
	const [form] = Form.useForm<FrontComponentOutput>();
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj<Partial<QryObj>>();
	const { getColumnSort } = useQrySort(srtQryMap);

	const { mentionsShowYn, record, setMentionsShowYn, setRecord } =
		useMentionsState<FrontComponentOutput>();

	const { makeSkip, pagingInput, setPagingInput, current, setTake } =
		usePaging();

	const [formDrawerOpenYn, setFormDrawerOpenYn] = useState(false);
	const [actionType, setActionType] = useState<EntityFormActionType>();
	const [messageApi, contextHolder] = message.useMessage();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);
	const { data, loading, previousData } = useFrmkFrntCmpntMgmtQuery();
	const [updateFrontComponent] = useUpdateFrontComponentMutation({
		refetchQueries: refetchQueryMap.frontComponent,
	});
	const [insertFrontComponent] = useUpdateFrontComponentMutation({
		refetchQueries: refetchQueryMap.frontComponent,
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
						key: "name",
						dataIndex: "name",
						title: "이름",
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
				] as Array<ColumnType<FrontComponentOutput>>
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
				<FrontComponentEntityDescriptions record={record} />
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
										await insertFrontComponent({
											variables: {
												input: {
													id: record.id,
													name: record.name,
													desc: record.desc,
												},
											},
										});
										break;
									case "update":
										await updateFrontComponent({
											variables: {
												input: {
													id: record.id,
													name: record.name,
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
				<FrontComponentEntityForm form={form} actionType={actionType} />
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
							total: data?.frontComponents.total,
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
							data?.frontComponents.list || previousData?.frontComponents.list
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
