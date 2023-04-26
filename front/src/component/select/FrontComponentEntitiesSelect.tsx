import React, { FC } from "react";
import { Select } from "antd";
import {
	FrontComponentEntitiesOutput,
	FrontComponentEntityOutput,
} from "@gqlType";
import { gql, useQuery } from "@apollo/client";
import { SelectProps } from "antd/es/select";

export const FRONT_COMPONENT_ENTITIES_QUERY = gql`
	query FRONT_COMPONENT_ENTITIES {
		frontComponentEntities {
			list {
				id
				name
			}
		}
	}
`;

export interface FrontComponentEntitiesSelectProps extends SelectProps {}
export const FrontComponentEntitiesSelect: FC<
	FrontComponentEntitiesSelectProps
> = ({ ...props }) => {
	const { data, loading, refetch } = useQuery<{
		frontComponentEntities: FrontComponentEntitiesOutput;
	}>(FRONT_COMPONENT_ENTITIES_QUERY);
	return (
		<Select<FrontComponentEntityOutput["id"]>
			{...props}
			loading={loading}
			showSearch
			options={data?.frontComponentEntities.list.map((o) => ({
				value: o.id,
				label: `${o.id} - ${o.name}`,
			}))}
		/>
	);
};
