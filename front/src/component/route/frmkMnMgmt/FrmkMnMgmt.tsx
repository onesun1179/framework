/**
 * 프레임워크 메뉴 관리
 */
import React, { useMemo, useState } from "react";
import { Button, Card, Drawer, Form, Space, Table } from "antd";
import { useQueryObj } from "@src/hooks";
import { useQrySort } from "@src/hooks/useQrySort";
import { useMentionsState } from "@src/hooks/useMentionsState";
import { usePaging } from "@src/hooks/usePaging";
import { EntityFormActionType, Nullable } from "@src/types";
import {
	SearchQueryKeyType,
	SortQueryKeyType,
	UtilCommon,
	UtilTable,
} from "@src/Util";
import { ColumnsType, ColumnType } from "antd/es/table";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import {
	IconOutput,
	MenuOutput,
	MenusSearchInput,
	MenusSortInput,
	RouteOutput,
} from "@gqlType";
import { useFrmkMnMgmtQuery } from "@src/component/route/frmkMnMgmt/quires";
import MenuDesc from "@src/component/descriptions/MenuDesc";
import MenuFormDrawer from "@src/component/form/menu/MenuFormDrawer";
import CustomIcon from "@src/component/common/customIcon/CustomIcon";

type SrtQryKey = SortQueryKeyType<
	"no" | "nm" | "path" | "fcid" | "uat" | "cat" | "dc"
>;
const srtQryMap: Record<SrtQryKey, keyof MenusSortInput> = {
	sort_no: "seqNo",
	sort_nm: "name",
	sort_path: "path",
	sort_fcid: "frontComponentId",
	sort_cat: "createdAt",
	sort_uat: "updatedAt",
	sort_dc: "desc",
};
type SrchQryKey = SearchQueryKeyType<"no" | "nm" | "ino" | "rno">;
const srchQryMap: Record<SrchQryKey, keyof MenusSearchInput> = {
	srch_no: "seqNo",
	srch_nm: "name",
	srch_ino: "iconSeqNo",
	srch_rno: "routeSeqNo",
};

type QryObj = typeof srtQryMap & typeof srchQryMap;
const qryObj: QryObj = {
	...srtQryMap,
	...srchQryMap,
};

export interface FrmkMenuMgmtProps {}
export default function FrmkMenuMgmt({}: FrmkMenuMgmtProps) {
	const [form] = Form.useForm<MenuOutput>();
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj<Partial<QryObj>>();
	const { getColumnSort } = useQrySort(srtQryMap);

	const { mentionsShowYn, record, setMentionsShowYn, setRecord } =
		useMentionsState<MenuOutput>();

	const { makeSkip, pagingInput, setPagingInput, current, setTake } =
		usePaging();

	const [formDrawerOpenYn, setFormDrawerOpenYn] = useState(false);
	const [actionType, setActionType] = useState<EntityFormActionType>();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);
	const { data, refetch, loading, previousData } = useFrmkMnMgmtQuery({
		variables: {
			pagingInput: pagingInput,
			menusInput: {
				sort: sortInputType,
			},
		},
	});

	const columns = useMemo<ColumnsType<MenuOutput>>(
		() =>
			(
				[
					{
						key: "seqNo",
						dataIndex: "seqNo",
						title: "ID",
						width: 50,
						align: "center",
					},
					{
						key: "name",
						dataIndex: "name",
						title: "이름",
					},
					{
						key: "icon",
						dataIndex: "icon",
						title: "아이콘",
						render: (iconOutput: Nullable<IconOutput>) =>
							UtilCommon.nilToNull(iconOutput, (iconOutput) => (
								<CustomIcon iconSeqNo={iconOutput.seqNo} />
							)),
						align: "center",
						width: 70,
					},
					{
						title: "라우트 정보",
						key: "route",
						children: [
							{
								key: "path",
								title: "경로",
								dataIndex: "route",
								render: (route: RouteOutput) => route.path,
							},
							{
								key: "frontComponentId",
								title: "화면 컴포넌트",
								dataIndex: "route",
								render: (route: RouteOutput) => route.frontComponentId,
							},
						],
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
				] as Array<ColumnType<MenuOutput>>
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
				<MenuDesc record={record} />
			</Drawer>

			<MenuFormDrawer
				actionType={actionType}
				open={formDrawerOpenYn}
				setOpen={setFormDrawerOpenYn}
				form={form}
			/>

			<Card
				title={"메뉴 리스트"}
				extra={
					<Space>
						<Button
							icon={<PlusOutlined />}
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
				}
			>
				<Table
					bordered
					pagination={{
						showSizeChanger: true,
						pageSizeOptions: [10, 20, 50],
						onShowSizeChange: (_, take) => setTake(take),
						pageSize: pagingInput.take,
						current,
						total: data?.menus.total,
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
					dataSource={data?.menus.list}
					onRow={(value) => ({
						onClick: () => {
							setRecord(value);
							setMentionsShowYn(true);
						},
					})}
				/>
			</Card>
		</>
	);
}
