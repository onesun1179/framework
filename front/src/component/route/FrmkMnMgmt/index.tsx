/**
 * 프레임워크 메뉴 관리
 */
import React, { FC, useMemo, useState } from "react";
import { Button, Form, Layout, message, Space, Table } from "antd";
import { useQueryObj } from "@src/hooks";
import { useQrySort } from "@src/hooks/useQrySort";
import { useMentionsState } from "@src/hooks/useMentionsState";
import { usePaging } from "@src/hooks/usePaging";
import { EntityFormActionType } from "@src/types";
import { SearchQueryKeyType, SortQueryKeyType, UtilTable } from "@src/Util";
import { ColumnType } from "antd/es/table";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { MenuOutput, MenusSearchInput, MenusSortInput } from "@gqlType";
import { useFrmkMnMgmtQuery } from "@src/component/route/FrmkMnMgmt/quires";

type SrtQryKey = SortQueryKeyType<"no" | "nm" | "ino" | "rno">;
const srtQryMap: Record<SrtQryKey, keyof MenusSortInput> = {
	sort_no: "seqNo",
	sort_nm: "name",
	sort_ino: "iconSeqNo",
	sort_rno: "routeSeqNo",
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

interface FrmkMenuMgmtProps {}
const FrmkMenuMgmt: FC = () => {
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
	const [messageApi, contextHolder] = message.useMessage();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);
	const { data, loading, previousData } = useFrmkMnMgmtQuery();
	// const [updateFrontComponent] = useUpdateFrontComponent({
	// 	refetchQueries: refetchQueryMap.frontComponent,
	// });
	// const [insertFrontComponent] = useUpdateFrontComponent({
	// 	refetchQueries: refetchQueryMap.frontComponent,
	// });

	const columns = useMemo(
		() =>
			(
				[
					{
						key: "seqNo",
						dataIndex: "seqNo",
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
			{contextHolder}
			{/*<Drawer onClose={() => setMentionsShowYn(false)} open={mentionsShowYn}>*/}
			{/*	<FrontComponentEntityDescriptions record={record} />*/}
			{/*</Drawer>*/}

			{/*<Drawer*/}
			{/*	open={formDrawerOpenYn}*/}
			{/*	onClose={() => setFormDrawerOpenYn(false)}*/}
			{/*	afterOpenChange={(open) => !open && setActionType(undefined)}*/}
			{/*	extra={*/}
			{/*		<Space>*/}
			{/*			<Button*/}
			{/*				type="primary"*/}
			{/*				onClick={async () => {*/}
			{/*					await form.validateFields();*/}
			{/*					const record = form.getFieldsValue();*/}
			{/*					switch (actionType) {*/}
			{/*						case "insert":*/}
			{/*							await insertFrontComponent({*/}
			{/*								variables: {*/}
			{/*									input: {*/}
			{/*										id: record.id,*/}
			{/*										name: record.name,*/}
			{/*										desc: record.desc,*/}
			{/*									},*/}
			{/*								},*/}
			{/*							});*/}
			{/*							break;*/}
			{/*						case "update":*/}
			{/*							await updateFrontComponent({*/}
			{/*								variables: {*/}
			{/*									input: {*/}
			{/*										id: record.id,*/}
			{/*										name: record.name,*/}
			{/*										desc: record.desc,*/}
			{/*									},*/}
			{/*								},*/}
			{/*							});*/}
			{/*							break;*/}
			{/*					}*/}
			{/*					setFormDrawerOpenYn(false);*/}
			{/*					await messageApi.success("성공");*/}
			{/*				}}*/}
			{/*			>*/}
			{/*				저장*/}
			{/*			</Button>*/}
			{/*		</Space>*/}
			{/*	}*/}
			{/*>*/}
			{/*	<FrontComponentEntityForm form={form} actionType={actionType} />*/}
			{/*</Drawer>*/}

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
						dataSource={data?.menus.list || previousData?.menus.list}
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

export default FrmkMenuMgmt;
