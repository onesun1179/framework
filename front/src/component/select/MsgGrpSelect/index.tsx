import React, { FC } from "react";
import { Select } from "antd";
import { SelectProps } from "antd/es/select";
import { useMessageGroupsQuery } from "@src/component/select/MsgGrpSelect/quires";

export interface MessageGroupEntitiesSelectProp extends SelectProps {}
export const Index: FC<MessageGroupEntitiesSelectProp> = ({ ...props }) => {
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
