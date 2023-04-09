import React, { FC, PropsWithChildren } from "react";
import { Layout } from "antd";
import { useWebStatusStore } from "@src/stores/webStatus.store";
import SiderMenu from "@src/component/layout/menu/SiderMenu";

const { Sider, Header, Content } = Layout;
const FullLayout: FC<PropsWithChildren> = ({ children }) => {
	const { menu } = useWebStatusStore();
	return (
		<Layout style={{ height: "100vh", width: "100vw" }} hasSider>
			<Sider
				collapsible
				collapsed={menu.collapsed}
				onCollapse={(collapsed) => menu.setCollapsed(collapsed)}
			>
				<div
					style={{
						height: 32,
						margin: 16,
						background: "rgba(255, 255, 255, 0.2)",
					}}
				/>
				<SiderMenu />
			</Sider>
			<Layout
				style={{
					width: "100%",
				}}
			>
				<Header style={{ padding: 0, backgroundColor: "red" }}></Header>
				<Content style={{ padding: "16px", width: "100%" }}>{children}</Content>
			</Layout>
		</Layout>
	);
};

export default FullLayout;
