import { MenuOutput } from "@gqlType";
import { Menu, MenuProps } from "antd";
import SvgPathToIcon from "@src/component/common/SvgPathToIcon";
import { Link } from "react-router-dom";
import React, { FC, useMemo } from "react";
import { useMenusQuery } from "@src/component/layout/menu/SiderMenu/quires";

function getItem(menuItem: MenuOutput): Required<MenuProps>["items"][number] {
	return {
		key: menuItem.seqNo + "",
		icon: menuItem.icon ? (
			<SvgPathToIcon filePath={menuItem.icon.filePath} />
		) : undefined,
		children:
			menuItem.children.length > 0
				? menuItem.children.map((_menuItem) => getItem(_menuItem))
				: undefined,
		label: <Link to={menuItem.route?.treeInfo.fullPath}>{menuItem.name}</Link>,
	};
}

const SiderMenu: FC = () => {
	const { loading, data } = useMenusQuery();

	const items = useMemo(() => {
		if (data) {
			return data.menus.list.map((o) => getItem(o));
		}
		return [];
	}, [data]);

	return <Menu theme={"dark"} mode="inline" items={items} />;
};

export default SiderMenu;
