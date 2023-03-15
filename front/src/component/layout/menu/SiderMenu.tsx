import React, { FC } from "react";
import { Menu, MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const SiderMenu: FC = () => {
	return (
		<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={[]} />
	);
};

export default SiderMenu;
