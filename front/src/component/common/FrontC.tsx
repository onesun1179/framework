import { createElement, FC } from "react";
import { gql, useQuery } from "@apollo/client";
import { All_FRONT_COMPONENT } from "@src/constants/component.constant";

const ALL_FRONT_COMPONENT_BY_CURRENT_USER_AND_FRONT_COMPONENT_ID = gql`
	query ($frontComponentId: String!) {
		data: allFrontComponentByCurrentUserAndFrontComponentId(
			frontComponentId: $frontComponentId
		) {
			id
		}
	}
`;

export const FrontC: FC<{
	frontComponentId: string;
}> = ({ frontComponentId }) => {
	const { loading, data } = useQuery<{
		data: {
			id: string | null;
		};
	}>(ALL_FRONT_COMPONENT_BY_CURRENT_USER_AND_FRONT_COMPONENT_ID, {
		variables: {
			frontComponentId,
		},
	});

	console.log(data, frontComponentId);

	if (data?.data.id) {
		return createElement(All_FRONT_COMPONENT[data.data.id]);
	}

	return null;
};
