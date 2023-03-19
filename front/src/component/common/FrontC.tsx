import React, { FC, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { All_FRONT_COMPONENT } from "@src/constants/component.constant";
import { Outlet } from "react-router-dom";

const ALL_FRONT_COMPONENT_BY_CURRENT_USER_AND_FRONT_COMPONENT_ID = gql`
	query ($frontComponentId: String!) {
		data: allFrontComponentByCurrentUserAndFrontComponentId(
			frontComponentId: $frontComponentId
		) {
			id
		}
	}
`;

const FrontC: FC<{
	frontComponentId?: string;
}> = ({ frontComponentId }) => {
	const { data } = useQuery(
		ALL_FRONT_COMPONENT_BY_CURRENT_USER_AND_FRONT_COMPONENT_ID,
		{
			skip: !frontComponentId,
			variables: {
				frontComponentId,
			},
		}
	);

	const Component = useMemo(() => All_FRONT_COMPONENT[data?.data.id], [data]);

	if (Component) {
		return (
			<Component>
				<Outlet />
			</Component>
		);
	}
	return <Outlet />;
};

export default FrontC;
