import { gql, useQuery } from "@apollo/client";
import { All_FRONT_COMPONENT } from "@src/constants/component.constant";
import { createElement, FC } from "react";

const ALL_FRONT_COMPONENT_BY_CURRENT_USER_AND_FRONT_COMPONENT_ID = gql`
	query ($frontComponentId: String!) {
		allFrontComponentByCurrentUserAndFrontComponentId(
			frontComponentId: $frontComponentId
		) {
			id
		}
	}
`;

export const withFrontC = (frontComponentId: string): FC => {
	return () => {
		const { loading, data } = useQuery<{
			id: string | null;
		}>(ALL_FRONT_COMPONENT_BY_CURRENT_USER_AND_FRONT_COMPONENT_ID, {
			variables: {
				frontComponentId,
			},
		});

		if (data?.id) {
			return createElement(All_FRONT_COMPONENT[data.id]);
		}

		return null;
	};
};
