import React, { FC } from "react";
import { Select } from "antd";
import { SelectProps } from "antd/es/select";
import { useMessageGroupsQuery } from "@src/component/select/msgGrpSelect/msgGrpSelect.quires";

export interface MsgGrpSelectProps extends SelectProps {}
export const MsgGrpSelect: FC<MsgGrpSelectProps> = ({ ...props }) => {
	const { data, loading, refetch } = useMessageGroupsQuery();

	return (
		<Select<string>
			{...props}
			loading={loading}
			options={data?.messageGroups.list.map((o) => ({
				value: o.code,
				label: `${o.code} - ${o.name}`,
			}))}
		/>
	);
};
