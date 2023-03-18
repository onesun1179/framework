import React, { FC, PropsWithChildren } from "react";
import { Breadcrumb, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { useWebStatusStore } from "@src/stores/webStatus.store";
import SiderMenu from "@src/component/layout/menu/SiderMenu";
import { Content, Footer, Header } from "antd/es/layout/layout";

const FullLayout: FC<PropsWithChildren> = ({ children }) => {
	const { menu } = useWebStatusStore();
	return (
		<Layout style={{ minHeight: "100vh" }}>
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
			<Layout className="site-layout">
				<Header style={{ padding: 0 }} />
				<Content style={{ margin: "0 16px" }}>
					<Breadcrumb style={{ margin: "16px 0" }}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
					{children}
				</Content>
				<Footer style={{ textAlign: "center" }}>
					Ant Design ©2023 Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};

export default FullLayout;
