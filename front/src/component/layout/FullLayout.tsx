import React, { FC, PropsWithChildren } from "react";
import { Layout } from "antd";
import { useWebStatusStore } from "@src/stores/webStatus.store";
import styled from "styled-components";
import SiderMenu from "@src/component/layout/menu/SiderMenu";

const { Sider, Header, Content } = Layout;

const FullStyledLayout = styled(Layout)`
	height: 100vh;
	width: 100vw;
`;

const StyledContent = styled(Layout.Content)`
	padding: 16px;
	width: 100%;
`;

const StyledHeader = styled(Layout.Header)`
	padding: 0;
	background-color: red;
`;

const MainStyledLayout = styled(Layout)`
	width: 100%;
`;
const FullLayout: FC<PropsWithChildren> = ({ children }) => {
	const { menu } = useWebStatusStore();
	return (
		<FullStyledLayout hasSider>
			<Sider
				collapsible
				collapsed={menu.collapsed}
				onCollapse={(collapsed) => menu.setCollapsed(collapsed)}
			>
				<div
					style={{
						height: 32,
						margin: 16,
					}}
				/>
				<SiderMenu />
			</Sider>
			<MainStyledLayout>
				<StyledHeader />
				<StyledContent>{children}</StyledContent>
			</MainStyledLayout>
		</FullStyledLayout>
	);
};

export default FullLayout;
