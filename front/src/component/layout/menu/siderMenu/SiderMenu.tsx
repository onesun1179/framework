import { MenuOutput } from "@gqlType";
import { Menu, MenuProps } from "antd";
import { Link, useMatches } from "react-router-dom";
import React, { FC, useMemo } from "react";
import { useMenusQuery } from "@src/component/layout/menu/siderMenu/quires";
import CustomIcon from "@src/component/common/customIcon/CustomIcon";
import { isNil } from "lodash";

function getItem(menuItem: MenuOutput): Required<MenuProps>["items"][number] {
	return {
		key: menuItem.seqNo + "",
		icon: menuItem.icon ? (
			<CustomIcon iconSeqNo={menuItem.icon.seqNo} />
		) : undefined,
		children:
			menuItem.children.length > 0
				? menuItem.children.map((_menuItem) => getItem(_menuItem))
				: undefined,
		label: <Link to={menuItem.route?.treeInfo.fullPath}>{menuItem.name}</Link>,
	};
}

const SiderMenu: FC = () => {
	const { data } = useMenusQuery();
	const matches = useMatches();
	const selectedKeys = useMemo(
		() =>
			matches
				.filter((o) => !isNil(o.handle.menuSeqNo))
				.map((o) => o.handle.menuSeqNo + ""),
		[matches]
	);

	const items = useMemo(() => {
		if (data) {
			return data.menus.list.map((o) => getItem(o));
		}
		return [];
	}, [data]);

	return (
		<Menu
			defaultOpenKeys={selectedKeys}
			selectedKeys={selectedKeys}
			theme={"dark"}
			mode="inline"
			items={items}
		/>
	);
};

export default SiderMenu;
