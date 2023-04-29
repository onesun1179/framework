import { FC, useState } from "react";
import {
	useFrmkCdMapMgmt1Query,
	useFrmkCdMapMgmt2Query,
} from "@src/component/route/frmkCdMapMgmt/quires";
import { Card, Col, Row, Table, Transfer } from "antd";
import { isNil } from "lodash";
import { useUpdateCodeChildrenMutation } from "@src/component/route/frmkCdMapMgmt/mutations";
import { refetchQueryMap } from "@src/Util";

const codeColumns = [
	{
		key: "name",
		dataIndex: "name",
		title: "이름",
	},
];

export interface FrmkCdMapMgmtProps {}

const FrmkCdMapMgmt: FC<FrmkCdMapMgmtProps> = () => {
	const [selectedCdSeqNo, setSelectedCdSeqNo] = useState<number>();
	const { data } = useFrmkCdMapMgmt1Query();
	const [updateMutate] = useUpdateCodeChildrenMutation({
		refetchQueries: refetchQueryMap.codeMap,
	});
	const { data: data2 } = useFrmkCdMapMgmt2Query({
		skip: isNil(selectedCdSeqNo),
		variables: {
			seqNo: selectedCdSeqNo!,
		},
	});

	return (
		<Row gutter={[12, 12]}>
			<Col span={8}>
				<Card title={"test"}>
					<Table
						dataSource={data?.codes.list}
						columns={codeColumns}
						rowKey={"seqNo"}
						rowSelection={{
							type: "radio",
							onSelect(o) {
								setSelectedCdSeqNo(o.seqNo);
							},
						}}
					/>
				</Card>
			</Col>
			<Col span={16}>
				<Card title={"test"}>
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
						oneWay
						rowKey={(o) => o.seqNo + ""}
						titles={["nonChildCodes", "childCodes"]}
						targetKeys={data2?.childCodes.map((o) => o.seqNo + "")}
						render={(o) => o.name}
					/>
				</Card>
			</Col>
		</Row>
	);
};

export default FrmkCdMapMgmt;
