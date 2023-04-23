import { Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { FilterDropdownProps } from "antd/es/table/interface";
import styled from "styled-components";

const WrapDiv = styled.div`
	padding: 8px;
`;

const SearchInput = styled(Input)`
	margin-bottom: 8px;
	display: block;
`;

const SearchButton = styled(Button)`
	width: 90px;
`;

export interface TableDropdownFilterStringProps extends FilterDropdownProps {
	dataIndex: string;
	onSearch: (search: string) => void;
}
export function TableDropdownFilterString({
	dataIndex,
	close,
	onSearch,
	selectedKeys,
	setSelectedKeys,
	confirm,
	...props
}: TableDropdownFilterStringProps) {
	const search = () => {
		confirm({
			closeDropdown: true,
		});
	};

	return (
		<WrapDiv onKeyDown={(e) => e.stopPropagation()}>
			<SearchInput
				onChange={(e) =>
					setSelectedKeys(e.target.value ? [e.target.value] : [])
				}
				onPressEnter={() => search()}
			/>
			<Space>
				<SearchButton
					type="primary"
					icon={<SearchOutlined />}
					size="small"
					onClick={() => search()}
				/>
				<Button
					type="link"
					size="small"
					onClick={() => {
						close();
					}}
				>
					닫기
				</Button>
			</Space>
		</WrapDiv>
	);
}
