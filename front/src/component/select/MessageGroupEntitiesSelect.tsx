import React, { FC } from "react";
import { Select } from "antd";
import { MessageGroupEntitiesOutput, MessageGroupEntityOutput } from "@gqlType";
import { gql, useQuery } from "@apollo/client";
import { SelectProps } from "antd/es/select";

const MESSAGE_GROUP_ENTITIES = gql`
	query MESSAGE_GROUP_ENTITIES {
		messageGroupEntities {
			list {
				name
				code
			}
		}
	}
`;

export interface MessageGroupEntitiesSelectProp extends SelectProps {}
export const MessageGroupEntitiesSelect: FC<MessageGroupEntitiesSelectProp> = ({
	...props
}) => {
	const { data, loading, refetch } = useQuery<{
		messageGroupEntities: MessageGroupEntitiesOutput;
	}>(MESSAGE_GROUP_ENTITIES);

	return (
		<Select<MessageGroupEntityOutput["code"]>
			{...props}
			loading={loading}
			options={data?.messageGroupEntities.list.map((o) => ({
				value: o.code,
				label: `${o.code} - ${o.name}`,
			}))}
		/>
	);
};
