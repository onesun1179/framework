import { MenuByRoleOutput } from "@gqlType";
import { Menu, MenuProps } from "antd";
import { Link, useMatches } from "react-router-dom";
import React, { FC, useMemo } from "react";
import { useMenusQuery } from "@src/component/layout/menu/siderMenu/siderMenu.quires";
import CustomIcon from "@src/component/common/customIcon/CustomIcon";
import { isNil } from "lodash";
import { UtilCommon } from "@src/Util";

function getItem(
	menuItem: MenuByRoleOutput
): Required<MenuProps>["items"][number] {
	return {
		key: menuItem.seqNo + "",
		icon: UtilCommon.nilToNull(menuItem.menu.iconSeqNo, (iconSeqNo) => (
			<CustomIcon iconSeqNo={iconSeqNo} />
		)),
		children:
			menuItem.children.length > 0 ? menuItem.children.map(getItem) : undefined,
		label: (
			<Link to={menuItem.menu.route?.treeInfo.fullPath}>
				{menuItem.menu.name}
			</Link>
		),
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
			return data.menus.map((o) => getItem(o));
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
