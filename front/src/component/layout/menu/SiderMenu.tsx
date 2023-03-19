import React, { FC, useMemo } from "react";
import { Menu, MenuProps } from "antd";
import { gql, useQuery } from "@apollo/client";
import { Icon as IconType, Menu as MenuType, Route } from "@gqlType";
import SvgPathToIcon from "@src/component/common/SvgPathToIcon";

function getItem(menuItem: MenuItemType): Required<MenuProps>["items"][number] {
	return {
		key: menuItem.seqNo + "",
		icon: menuItem.icon ? (
			<SvgPathToIcon filePath={menuItem.icon.filePath} />
		) : undefined,
		children:
			menuItem.children.length > 0
				? menuItem.children.map((_menuItem) => getItem(_menuItem))
				: undefined,
		label: menuItem.name,
		onClick() {},
	};
}

type MenuItemType = Pick<MenuType, "seqNo" | "name"> & {
	children: Array<MenuItemType>;
	icon: Pick<IconType, "filePath">;
};

const QUERY = gql`
	query {
		rootMenus {
			seqNo
			name
			icon {
				filePath
			}
			route {
				path
			}
			children {
				seqNo
				name
				icon {
					filePath
				}
				route {
					path
				}
				children {
					seqNo
					name
					icon {
						filePath
					}
					route {
						path
					}
					children {
						seqNo
						name
						icon {
							filePath
						}
						route {
							path
						}
						children {
							seqNo
							name
							icon {
								filePath
							}
							route {
								path
							}
							children {
								seqNo
								name
								icon {
									filePath
								}
								route {
									path
								}
							}
						}
					}
				}
			}
		}
	}
`;

type RootMenu = Pick<MenuType, "seqNo" | "name"> & {
	icon: Pick<IconType, "filePath">;
	route: Pick<Route, "path">;
	children: Array<RootMenu>;
};

const SiderMenu: FC = () => {
	const { loading, data } = useQuery<{
		rootMenus: Array<RootMenu>;
	}>(QUERY);

	console.log(data);
	const items = useMemo(() => {
		if (data) {
			return data.rootMenus.map((o) => getItem(o));
		}
		return [];
	}, [data]);

	return (
		<Menu
			theme="dark"
			defaultSelectedKeys={["1"]}
			mode="inline"
			items={items}
		/>
	);
};

export default SiderMenu;
