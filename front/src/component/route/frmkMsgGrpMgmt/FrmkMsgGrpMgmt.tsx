import React, { FC, memo, useMemo, useState } from "react";
import {
	SearchQueryKeyType,
	SortQueryKeyType,
	UtilRefetch,
	UtilTable,
} from "@src/Util";
import { useQueryObj } from "@src/hooks";
import { usePaging } from "@src/hooks/usePaging";
import { Button, Card, Drawer, Form, Space, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import MsgGrpFormDrawer from "@src/component/form/messageGroup/MsgGrpFormDrawer";
import { useMentionsState } from "@src/hooks/useMentionsState";
import { useQrySort } from "@src/hooks/useQrySort";
import { EntityFormActionType } from "@src/types";
import {
	MessageGroupOutput,
	MessageGroupsSearchInput,
	MessageGroupsSortInput,
} from "@gqlType";
import { useFrmkMsgGrkMgmtDataQuery } from "@src/component/route/frmkMsgGrpMgmt/frmkMsgGrpMgmt.quires";
import MsgGrpDesc from "@src/component/descriptions/MsgGrpDesc";

/**
 * 프레임워크 메뉴 그룹 관리
 */

type SrtQryKey = SortQueryKeyType<"nm" | "cd" | "desc" | "cat" | "uat">;
const srtQryMap: Record<SrtQryKey, keyof MessageGroupsSortInput> = {
	sort_cd: "code",
	sort_nm: "name",
	sort_desc: "desc",
	sort_cat: "createdAt",
	sort_uat: "updatedAt",
};
type SrchQryKey = SearchQueryKeyType<"nm" | "cd">;
const srchQryMap: Record<SrchQryKey, keyof MessageGroupsSearchInput> = {
	srch_nm: "name",
	srch_cd: "code",
};

type QryObj = typeof srtQryMap & typeof srchQryMap;
const qryObj: QryObj = {
	...srtQryMap,
	...srchQryMap,
};

const FrmkMsgGrpMgmt: FC = () => {
	const [form] = Form.useForm<MessageGroupOutput>();
	const { queryObj, setQueryObj, searchParams, setSearchParams } =
		useQueryObj<Partial<QryObj>>();
	const { getColumnSort } = useQrySort(srtQryMap);

	const { mentionsShowYn, record, setMentionsShowYn, setRecord } =
		useMentionsState<MessageGroupOutput>();

	const { makeSkip, pagingInput, setPagingInput, current, setTake } =
		usePaging();

	const [formDrawerOpenYn, setFormDrawerOpenYn] = useState(false);
	const [actionType, setActionType] = useState<EntityFormActionType>();

	const sortInputType = useMemo(
		() => UtilTable.toSortInputType(queryObj, qryObj),
		[queryObj]
	);
	const { data, loading, previousData } = useFrmkMsgGrkMgmtDataQuery({
		variables: {
			paging: pagingInput,
			param: {
				sort: sortInputType,
			},
		},
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
				<MsgGrpDesc record={record} />
			</Drawer>

			<MsgGrpFormDrawer
				actionType={actionType}
				open={formDrawerOpenYn}
				setOpen={setFormDrawerOpenYn}
				form={form}
			/>
			<Card
				title={"메세지 코드 리스트"}
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
								UtilRefetch.message();
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
						total: data?.messageGroups.total,
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
						data?.messageGroups.list || previousData?.messageGroups.list
					}
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
};

export default memo(FrmkMsgGrpMgmt);
