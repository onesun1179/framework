import React, { FC, useMemo, useState } from "react";
import {
	SearchQueryKeyType,
	SortQueryKeyType,
	UtilRefetch,
	UtilTable,
} from "@src/Util";
import {
	RoleGroupOutput,
	RoleOutput,
	RolesSearchInput,
	RolesSortInput,
} from "@gqlType";
import { useQueryObj } from "@src/hooks";
import { useMentionsState } from "@src/hooks/useMentionsState";
import { useQrySort } from "@src/hooks/useQrySort";
import { usePaging } from "@src/hooks/usePaging";
import { Button, Drawer, Form, Layout, Space, Table } from "antd";
import { EntityFormActionType } from "@src/types";
import { ColumnsType, ColumnType } from "antd/es/table";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useFrmkRoleMgmt1Query } from "@src/component/route/frmkRoleMgmt/quires";
import RoleDesc from "@src/component/descriptions/RoleDesc";
import RoleFormDrawer from "@src/component/form/role/RoleFormDrawer";

type SrtQryKey = SortQueryKeyType<"no" | "nm" | "id" | "desc" | "cat" | "uat">;
const srtQryMap: Record<SrtQryKey, keyof RolesSortInput> = {
	sort_no: "seqNo",
	sort_nm: "name",
	sort_id: "identifier",
	sort_uat: "updatedAt",
	sort_cat: "createdAt",
	sort_desc: "desc",
};
type SrchQryKey = SearchQueryKeyType<"nm" | "no" | "id">;
const srchQryMap: Record<SrchQryKey, keyof RolesSearchInput> = {
	srch_no: "seqNo",
	srch_nm: "name",
	srch_id: "identifier",
};
type QryObj = typeof srtQryMap & typeof srchQryMap;
const qryObj: QryObj = {
	...srtQryMap,
	...srchQryMap,
};

const FrmkRoleMgmt: FC = () => {
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj<Partial<QryObj>>();

	const { mentionsShowYn, record, setMentionsShowYn, setRecord } =
		useMentionsState<RoleOutput>();
	const { getColumnSort } = useQrySort(srtQryMap);
	const { makeSkip, pagingInput, setPagingInput, current, setTake } =
		usePaging(10);
	const [form] = Form.useForm<RoleOutput>();
	const [formDrawerOpenYn, setFormDrawerOpenYn] = useState(false);
	const [actionType, setActionType] = useState<EntityFormActionType>();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);

	const searchInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);

	const { data, loading, previousData } = useFrmkRoleMgmt1Query({
		variables: {
			pagingInput,
			rolesInput: {
				sort: sortInputType,
			},
		},
	});

	const columns: ColumnsType<RoleOutput> = useMemo(
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
						key: "identifier",
						dataIndex: "identifier",
						title: "식별자",
					},
					{
						key: "roleGroup",
						dataIndex: "roleGroup",
						title: "그룹명",
						render(o: RoleGroupOutput, record) {
							return o.name;
						},
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
				] as Array<ColumnType<RoleOutput>>
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
			<Drawer onClose={() => setMentionsShowYn(false)} open={mentionsShowYn}>
				<RoleDesc record={record} />
			</Drawer>

			<RoleFormDrawer
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
							total: data?.roles.total,
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
						dataSource={data?.roles.list || previousData?.roles.list}
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

export default FrmkRoleMgmt;
