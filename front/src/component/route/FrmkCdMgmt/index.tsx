/**
 * 프레임워크 코드 관리
 */
import React, { useMemo, useState } from "react";
import { SearchQueryKeyType, SortQueryKeyType, UtilTable } from "@src/Util";
import { CodeOutput, CodesSearchInput, CodesSortInput } from "@gqlType";
import { Button, Drawer, Form, Layout, Space, Table } from "antd";
import { useQueryObj } from "@src/hooks";
import { useQrySort } from "@src/hooks/useQrySort";
import { useMentionsState } from "@src/hooks/useMentionsState";
import { usePaging } from "@src/hooks/usePaging";
import { EntityFormActionType } from "@src/types";
import { ColumnType } from "antd/es/table";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useFrmkCdMgmt1Query } from "@src/component/route/FrmkCdMgmt/quires";
import CdDesc from "@src/component/descriptions/CdDesc";
import CdFormDrawer from "@src/component/form/code/CdFormDrawer";

type SrtQryKey = SortQueryKeyType<"nm" | "no">;
const srtQryMap: Record<SrtQryKey, keyof CodesSortInput> = {
	sort_no: "seqNo",
	sort_nm: "name",
};
type SrchQryKey = SearchQueryKeyType<"nm" | "no">;
const srchQryMap: Record<SrchQryKey, keyof CodesSearchInput> = {
	srch_no: "seqNo",
	srch_nm: "name",
};

type QryObj = typeof srtQryMap & typeof srchQryMap;
const qryObj: QryObj = {
	...srtQryMap,
	...srchQryMap,
};

function FrmkCdMgmt() {
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj<Partial<QryObj>>();
	const { getColumnSort } = useQrySort(srtQryMap);
	const [form] = Form.useForm<CodeOutput>();

	const { mentionsShowYn, record, setMentionsShowYn, setRecord } =
		useMentionsState<CodeOutput>();

	const { makeSkip, pagingInput, setPagingInput, current, setTake } =
		usePaging();

	const [formDrawerOpenYn, setFormDrawerOpenYn] = useState(false);
	const [actionType, setActionType] = useState<EntityFormActionType>();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);
	const { data, loading, previousData, refetch } = useFrmkCdMgmt1Query({
		variables: {
			pagingInput: pagingInput,
			codesInput: {
				sort: sortInputType,
			},
		},
	});

	const columns = useMemo(
		() =>
			(
				[
					{
						key: "seqNo",
						dataIndex: "seqNo",
						title: "ID",
						align: "center",
						width: 50,
					},
					{
						key: "name",
						dataIndex: "name",
						title: "이름",
					},

					{
						key: "createdAt",
						dataIndex: "createdAt",
						title: "생성일자",
						width: 250,
					},
					{
						key: "updatedAt",
						dataIndex: "updatedAt",
						title: "수정일자",
						width: 250,
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
											form.setFieldsValue(record);
											setFormDrawerOpenYn(true);
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
				] as Array<ColumnType<CodeOutput>>
			).map((o) => {
				return {
					...o,
					...getColumnSort(o),
				};
			}),
		[setActionType, setFormDrawerOpenYn, srtQryMap, getColumnSort]
	);

	return (
		<>
			<Drawer onClose={() => setMentionsShowYn(false)} open={mentionsShowYn}>
				<CdDesc record={record} />
			</Drawer>
			<CdFormDrawer
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
								refetch();
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
							total: data?.codes.total,
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
						dataSource={data?.codes.list || previousData?.codes.list}
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

export default FrmkCdMgmt;
