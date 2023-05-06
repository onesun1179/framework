import React, { FC } from "react";
import { Select } from "antd";
import { SelectProps } from "antd/es/select";
import { useFrontComponentQuery } from "@src/component/select/fCSelect/fCSelect.quires";

export interface FCSelectProps extends SelectProps {}
const FCSelect: FC<FCSelectProps> = ({ ...props }) => {
	const { data, loading, refetch } = useFrontComponentQuery();
	return (
		<Select<string>
			{...props}
			loading={loading}
			showSearch
			options={data?.frontComponents.list.map((o) => ({
				value: o.id,
				label: `${o.id} - ${o.name}`,
			}))}
		/>
	);
};

export default FCSelect;
