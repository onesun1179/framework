import React, { FC, useMemo } from "react";
import { Menu, MenuProps } from "antd";
import { gql, useQuery } from "@apollo/client";

import SvgPathToIcon from "@src/component/common/SvgPathToIcon";
import { Link } from "react-router-dom";
import { MenuOutput } from "@gqlType";

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

const QUERY = gql`
	query {
		menus {
			seqNo
			name
			icon {
				name
				filePath
			}
			route {
				seqNo
				treeInfo {
					fullPath
				}
			}
			children {
				seqNo
				name
				icon {
					name
					filePath
				}
				route {
					seqNo
					treeInfo {
						fullPath
					}
				}
				children {
					seqNo
					name
					icon {
						name
						filePath
					}
					route {
						seqNo
						treeInfo {
							fullPath
						}
					}
					children {
						seqNo
						name
						icon {
							name
							filePath
						}
						route {
							seqNo
							treeInfo {
								fullPath
							}
						}
						children {
							seqNo
							name
							icon {
								name
								filePath
							}
							route {
								seqNo
								treeInfo {
									fullPath
								}
							}
						}
					}
				}
			}
		}
	}
`;

const SiderMenu: FC = () => {
	const { loading, data } = useQuery<{
		menus: Array<MenuOutput>;
	}>(QUERY);

	const items = useMemo(() => {
		if (data) {
			return data.menus.map((o) => getItem(o));
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
