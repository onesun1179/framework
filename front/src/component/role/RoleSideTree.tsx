import React, { FC, PropsWithChildren } from "react";
import { Card, Col, Row } from "antd";
import RoleDirectoryTree from "@src/component/role/RoleDirectoryTree";
import styled from "styled-components";

export interface RoleSideTreeProps {}

const FullHeightRow = styled(Row)`
	height: 100%;
`;
const FullHeightCard = styled(Card)`
	height: 100%;
`;

const RoleSideTree: FC<PropsWithChildren<RoleSideTreeProps>> = ({
	children,
}) => {
	return (
		<FullHeightRow gutter={[16, 16]}>
			<Col span={8}>
				<FullHeightCard title={"권한"}>
					<RoleDirectoryTree />
				</FullHeightCard>
			</Col>
			<Col span={16}>{children}</Col>
		</FullHeightRow>
	);
};

export default RoleSideTree;
