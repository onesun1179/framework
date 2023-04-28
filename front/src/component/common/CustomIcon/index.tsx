import { FC } from "react";
import { useCustomIcon1Query } from "@src/component/common/CustomIcon/quires";
import { isNil } from "lodash";
import SvgPathToIcon from "@src/component/common/SvgPathToIcon";
import { Tooltip } from "antd";

export interface CustomIcon {
	iconSeqNo?: number;
}
const CustomIcon: FC<CustomIcon> = ({ iconSeqNo }) => {
	const { data } = useCustomIcon1Query({
		skip: isNil(iconSeqNo),
		variables: {
			iconSeqNo: iconSeqNo!,
		},
	});
	return (
		<Tooltip title={data?.icon.name}>
			<SvgPathToIcon filePath={data?.icon.fileFullPath} />
		</Tooltip>
	);
};

export default CustomIcon;
