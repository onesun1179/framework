import React, { FC, PropsWithChildren } from "react";
import FullLayout from "@src/component/layout/FullLayout";

const Hm: FC<PropsWithChildren> = ({ children }) => {
	return <FullLayout>{children}</FullLayout>;
};

export default Hm;
