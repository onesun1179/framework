import React, { FC } from "react";
import styled from "styled-components";
import { Card, Transfer } from "antd";
import { useRoleByUsrMgmt1Query } from "@src/component/route/roleByUsrMgmt/roleByUsrMgmt.quires";

const FullHeightCard = styled(Card)`
	height: 100%;
`;
const RoleByUsrMgmt: FC = () => {
	const { data } = useRoleByUsrMgmt1Query();

	return (
		<FullHeightCard title={"사용자"}>
			<Transfer
				listStyle={{
					width: "100%",
				}}
				showSearch
				dataSource={data?.users.list}
				rowKey={(o) => o.id}
				titles={["사용자", "그룹 사용자"]}
				// targetKeys={data?.users.list.map((o) => o.id)}
				render={(o) => o.name}
			/>
		</FullHeightCard>
	);
};

export default RoleByUsrMgmt;
