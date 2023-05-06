/**
 * 권한별 컴포넌트
 */
import React, { FC, memo, useContext, useMemo } from "react";
import { Card, Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRoleByFrntCmpntMgmtQuery } from "@src/component/route/roleByFrntCmpntMgmt/roleByFrntCmpntMgmt.quries";
import { isNil } from "lodash";
import styled from "styled-components";
import { useUpdateAllFrontComponentByRoleFrontComponentMapEntityMutation } from "@src/component/route/roleByFrntCmpntMgmt/roleByFrntCmpntMgmt.mutations";
import { refetchQueryMap } from "@src/Util";
import { FrontComponentOutput } from "@gqlType";
import { RoleMgmtContext } from "@src/component/route/roleMgmt/RoleMgmt";

const FullWidthSelect = styled(Select)`
	width: 100%;
`;
const FullHeightCard = styled(Card)`
	height: 100%;
`;
const RoleByFrntCmpntMgmt: FC = () => {
	const { roleSeqNo } = useContext(RoleMgmtContext);

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
		<FullHeightCard title={"화면 컴포넌트"}>
			<Table
				bordered
				columns={columns}
				dataSource={roleSeqNo ? _data?.frontComponents.list : []}
				loading={loading}
				rowKey={"id"}
			/>
		</FullHeightCard>
	);
};

export default memo(RoleByFrntCmpntMgmt);
