import React, { FC, PropsWithChildren, useEffect, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import { All_FRONT_COMPONENT } from "@src/constants/component.constant";

const ALL_FRONT_COMPONENT_BY_AUTH = gql`
	query ($frontComponentId: String!) {
		data: allFrontComponentByAuth(frontComponentId: $frontComponentId) {
			id
		}
	}
`;

const FrontC: FC<
	PropsWithChildren<{
		frontComponentId?: string;
	}>
> = ({ frontComponentId, children }) => {
	const { data } = useQuery(ALL_FRONT_COMPONENT_BY_AUTH, {
		skip: !frontComponentId,
		variables: {
			frontComponentId,
		},
	});
	const Component = useMemo(
		() => All_FRONT_COMPONENT[data?.data?.id] || null,
		[data]
	);

	useEffect(() => {
		if (data) {
			if (!data.data?.id) {
				console.error(`front id 없음, ${frontComponentId}`);
			} else if (!All_FRONT_COMPONENT[data?.data?.id]) {
				console.error(`해당하는 컴포넌트 없음, ${data?.data?.id}`);
			}
		}
	}, [data]);

	if (Component) {
		return <Component>{children || null}</Component>;
	}
	return children || null;
};

export default FrontC;
