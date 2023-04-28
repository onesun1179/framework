import { FC } from "react";
import { useCustomIcon1Query } from "@src/component/common/CustomIcon/quires";
import { isNil } from "lodash";
import SvgPathToIcon from "@src/component/common/SvgPathToIcon";
import { Tooltip } from "antd";

export interface CustomIcon {
	iconSeqNo?: number;
	tooltip?: boolean;
}

const CustomIcon: FC<CustomIcon> = ({ iconSeqNo, tooltip = false }) => {
	const { data } = useCustomIcon1Query({
		skip: isNil(iconSeqNo),
		variables: {
			iconSeqNo: iconSeqNo!,
		},
	});
	return (
		<Tooltip title={data?.icon.name} open={tooltip ? undefined : false}>
			<SvgPathToIcon filePath={data?.icon.fileFullPath} />
		</Tooltip>
	);
};

export default CustomIcon;
