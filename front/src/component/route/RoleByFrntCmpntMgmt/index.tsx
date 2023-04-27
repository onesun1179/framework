/**
 * 권한별 컴포넌트
 */
import React, { FC, memo, useMemo, useState } from "react";
import { Col, ConfigProvider, Row, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRoleByFrntCmpntMgmtQuery } from "@src/component/route/RoleByFrntCmpntMgmt/quries";
import RoleDirectoryTree from "@src/component/role/RoleDirectoryTree";
import { isNil } from "lodash";
import styled from "styled-components";
import { useUpdateAllFrontComponentByRoleFrontComponentMapEntityMutation } from "@src/component/route/RoleByFrntCmpntMgmt/mutations";
import { refetchQueryMap } from "@src/Util";
import { FrontComponentOutput } from "@gqlType";

const FullWidthSelect = styled(Select)`
	width: 100%;
`;
const RoleByFrntCmpntMgmt: FC = () => {
	const [roleSeqNo, setRoleSeqNo] = useState<number>();
	const { data, loading, previousData } = useRoleByFrntCmpntMgmtQuery({
		skip: isNil(roleSeqNo),
		variables: {
			roleSeqNo: roleSeqNo!,
		},
	});
	const _data = useMemo(() => data || previousData, [data]);
	const [mutate] =
		useUpdateAllFrontComponentByRoleFrontComponentMapEntityMutation({
			refetchQueries: refetchQueryMap.allFrontComponent,
		});

	const columns = useMemo<ColumnsType<FrontComponentOutput>>(
		() => [
			{
				key: "id",
				dataIndex: "id",
				title: "ID",
				width: 200,
			},
			{
				key: "name",
				dataIndex: "name",
				title: "이름",
				width: 300,
			},
			{
				key: `all_${roleSeqNo}`,
				title: "화면 컴포넌트",
				render: (_, record) => (
					<FullWidthSelect
						defaultValue={record.allFrontComponentByRole?.id}
						onSelect={(o) => {
							mutate({
								variables: {
									roleSeqNo: roleSeqNo!,
									frontComponentId: record.id,
									allFrontComponentId: o as string,
								},
							});
							console.log(o, record);
						}}
						options={record.allFrontComponents.map((o) => ({
							value: o.id,
							label: o.id,
						}))}
					/>
				),
			},
		],
		[_data]
	);

	return (
		<Row gutter={[16, 16]} wrap>
			<Col span={8}>
				<RoleDirectoryTree
					defaultExpandAll
					onSelect={(_, { node: { seqNo } }) => {
						setRoleSeqNo(seqNo);
					}}
				/>
			</Col>
			<Col span={16}>
				<ConfigProvider>
					<Table
						bordered
						columns={columns}
						dataSource={roleSeqNo ? _data?.frontComponents.list : []}
						loading={loading}
						rowKey={"id"}
					/>
				</ConfigProvider>
			</Col>
		</Row>
	);
};

export default memo(RoleByFrntCmpntMgmt);
