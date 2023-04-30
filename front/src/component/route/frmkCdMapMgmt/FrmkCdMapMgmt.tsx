import React, { FC, useMemo, useState } from "react";
import {
	useFrmkCdMapMgmt1Query,
	useFrmkCdMapMgmt2Query,
} from "@src/component/route/frmkCdMapMgmt/quires";
import {
	Button,
	Card,
	Col,
	Drawer,
	Form,
	Row,
	Space,
	Table,
	Transfer,
} from "antd";
import { isNil } from "lodash";
import { useUpdateCodeChildrenMutation } from "@src/component/route/frmkCdMapMgmt/mutations";
import {
	refetchQueryMap,
	SearchQueryKeyType,
	SortQueryKeyType,
	UtilTable,
} from "@src/Util";
import {
	CodeOutput,
	CodesOutput,
	CodesSearchInput,
	CodesSortInput,
} from "@gqlType";
import CdDesc from "@src/component/descriptions/CdDesc";
import CdFormDrawer from "@src/component/form/code/CdFormDrawer";
import { useQueryObj } from "@src/hooks";
import { useQrySort } from "@src/hooks/useQrySort";
import { useMentionsState } from "@src/hooks/useMentionsState";
import { usePaging } from "@src/hooks/usePaging";
import { EntityFormActionType } from "@src/types";
import { ColumnType } from "antd/es/table";

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
export interface FrmkCdMapMgmtProps {}

const FrmkCdMapMgmt: FC<FrmkCdMapMgmtProps> = () => {
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
	const [selectedCdSeqNo, setSelectedCdSeqNo] = useState<number>();
	const { data, loading } = useFrmkCdMapMgmt1Query({
		variables: {
			pagingInput: pagingInput,
			codesInput: {
				sort: sortInputType,
			},
		},
	});
	const [updateMutate] = useUpdateCodeChildrenMutation({
		refetchQueries: refetchQueryMap.codeMap,
	});
	const { data: data2 } = useFrmkCdMapMgmt2Query({
		skip: isNil(selectedCdSeqNo),
		variables: {
			seqNo: selectedCdSeqNo!,
		},
	});

	const codeColumns = useMemo(
		() =>
			(
				[
					{
						key: "seqNo",
						dataIndex: "seqNo",
						title: "ID",
						width: 50,
					},
					{
						key: "name",
						dataIndex: "name",
						title: "이름",
					},
					{
						key: "children",
						dataIndex: "children",
						title: "하위 코드 갯수",
						render(v: CodesOutput) {
							return v.total;
						},
					},
					{
						key: "parents",
						dataIndex: "parents",
						title: "상위 코드 갯수",
						render(v: CodesOutput) {
							return v.total;
						},
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
			<Row gutter={[12, 12]}>
				<Col span={12}>
					<Card title={"코드"}>
						<Table
							loading={loading}
							bordered
							dataSource={data?.codes.list}
							columns={codeColumns}
							childrenColumnName={"test"}
							rowKey={"seqNo"}
							rowSelection={{
								type: "radio",
								onSelect(o) {
									setSelectedCdSeqNo(o.seqNo);
								},
							}}
							pagination={{
								showSizeChanger: true,
								pageSizeOptions: [10, 20, 50],
								onShowSizeChange: (_, take) => setTake(take),
								pageSize: pagingInput.take,
								current,
								total: data?.codes.total,

								onChange(page, take) {
									console.log(page, take);
									setPagingInput({
										take,
										skip: makeSkip(page),
									});
								},
							}}
							onRow={(value) => ({
								onClick: () => {
									setRecord(value);
									setMentionsShowYn(true);
								},
							})}
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Space
						direction={"vertical"}
						style={{
							width: "100%",
						}}
					>
						<Card title={"하위 코드"}>
							<Transfer
								onChange={(targetKeys, direction, moveKeys) => {
									updateMutate({
										variables: {
											seqNo: selectedCdSeqNo!,
											childCodeSeqNos: targetKeys.map((o) => Number(o)),
										},
									});
								}}
								listStyle={{
									width: "100%",
								}}
								showSearch
								dataSource={data2?.codes.list}
								rowKey={(o) => o.seqNo + ""}
								titles={["nonChildCodes", "childCodes"]}
								targetKeys={data2?.childCodes.list.map((o) => o.seqNo + "")}
								render={(o) => o.name}
							/>
						</Card>
						<Card title={"상위 코드"}>
							<Transfer
								onChange={(targetKeys, direction, moveKeys) => {
									updateMutate({
										variables: {
											seqNo: selectedCdSeqNo!,
											parentCodeSeqNos: targetKeys.map((o) => Number(o)),
										},
									});
								}}
								listStyle={{
									width: "100%",
								}}
								showSearch
								dataSource={data2?.codes.list}
								rowKey={(o) => o.seqNo + ""}
								titles={["nonChildCodes", "childCodes"]}
								targetKeys={data2?.parentCodes.list.map((o) => o.seqNo + "")}
								render={(o) => o.name}
							/>
						</Card>
					</Space>
				</Col>
			</Row>
		</>
	);
};
FrmkCdMapMgmt.displayName = "FrmkCdMapMgmt";
export default FrmkCdMapMgmt;
