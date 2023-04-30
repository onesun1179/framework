import React, { FC } from "react";
import { Select } from "antd";
import { SelectProps } from "antd/es/select";
import { useRoleGroupsQuery } from "@src/component/select/RoleGroupSelect/quires";

export interface RoleGroupSelectProps extends SelectProps {}

const RoleGroupSelect: FC<RoleGroupSelectProps> = ({ ...props }) => {
	const { data, loading } = useRoleGroupsQuery();

	return (
		<Select
			loading={loading}
			showSearch
			options={data?.roleGroups.list.map((o) => ({
				value: o.seqNo,
				label: o.name,
			}))}
			{...props}
		/>
	);
};

export default RoleGroupSelect;
