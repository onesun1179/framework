import React, { FC, useMemo } from "react";
import { Outlet, useMatches } from "react-router-dom";
import FrontC from "@src/component/common/FrontC";

const FrontCRoute: FC<{
	frontComponentId?: string;
}> = ({ frontComponentId }) => {
	const matches = useMatches();
	const locationFrontComponentIds = useMemo(
		() => matches.map((o) => o.handle.frontComponentId),
		[matches]
	);

	if (locationFrontComponentIds.includes(frontComponentId)) {
		return (
			<FrontC frontComponentId={frontComponentId}>
				<Outlet />
			</FrontC>
		);
	}
	return null;
};

export default FrontCRoute;
