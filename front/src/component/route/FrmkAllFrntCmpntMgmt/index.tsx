import React, { FC, memo, useMemo, useState } from "react";
import { SearchQueryKeyType, SortQueryKeyType, UtilTable } from "@src/Util";
import { Button, Drawer, Form, Layout, Space, Table } from "antd";
import { useQueryObj } from "@src/hooks";
import { useQrySort } from "@src/hooks/useQrySort";
import { useMentionsState } from "@src/hooks/useMentionsState";
import { usePaging } from "@src/hooks/usePaging";
import { EntityFormActionType } from "@src/types";
import { ColumnType } from "antd/es/table";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import AllFCDesc from "@src/component/descriptions/AllFCDesc";

import AllFCFormDrawer from "@src/component/form/allFrontComponent/AllFCFormDrawer";
import {
	AllFrontComponentOutput,
	AllFrontComponentsSearchInput,
	AllFrontComponentsSortInput,
	MessageGroupOutput
} from "@gqlType";
import { useFrmkAllFrntCmpntMgmtQuery } from "@src/component/route/FrmkAllFrntCmpntMgmt/quires";

/**
 * 프레임워크 컴포넌트 관리
 */

type SrtQryKey = SortQueryKeyType<"id" | "fcId" | "desc" | "cat" | "uat">;
const srtQryMap: Record<SrtQryKey, keyof AllFrontComponentsSortInput> = {
	sort_id: "id",
	sort_fcId: "frontComponentId",
	sort_desc: "desc",
	sort_cat: "createdAt",
	sort_uat: "updatedAt",
};
type SrchQryKey = SearchQueryKeyType<"id" | "fcId">;
const srchQryMap: Record<SrchQryKey, keyof AllFrontComponentsSearchInput> = {
	srch_id: "id",
	srch_fcId: "frontComponentId",
};

type QryObj = typeof srtQryMap & typeof srchQryMap;
const qryObj: QryObj = {
	...srtQryMap,
	...srchQryMap,
};

const FrmkFrntCmpntMgmt: FC = () => {
	const [form] = Form.useForm<AllFrontComponentOutput>();
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj<Partial<QryObj>>();
	const { getColumnSort } = useQrySort(srtQryMap);

	const { mentionsShowYn, record, setMentionsShowYn, setRecord } =
		useMentionsState<AllFrontComponentOutput>();

	const { makeSkip, pagingInput, setPagingInput, current, setTake } =
		usePaging();

	const [formDrawerOpenYn, setFormDrawerOpenYn] = useState(false);
	const [actionType, setActionType] = useState<EntityFormActionType>();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);
	const { data, loading, previousData } = useFrmkAllFrntCmpntMgmtQuery();

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
				] as Array<ColumnType<MessageGroupOutput>>
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
			<Drawer onClose={() => setMentionsShowYn(false)} open={mentionsShowYn}>
				<AllFCDesc record={record} />
			</Drawer>

			<AllFCFormDrawer
				actionType={actionType}
				open={formDrawerOpenYn}
				setOpen={setFormDrawerOpenYn}
				form={form}
			/>

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
							total: data?.allFrontComponents.total,
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
							data?.allFrontComponents.list ||
							previousData?.allFrontComponents.list
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
