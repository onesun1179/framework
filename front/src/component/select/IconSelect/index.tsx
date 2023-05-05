import { FC, memo, useState } from "react";
import { Button, Space } from "antd";
import IconSelectModal from "@src/component/modal/IconSelectModal";
import { IconOutput } from "@gqlType";
import CustomIcon from "@src/component/common/customIcon/CustomIcon";
import { UtilCommon } from "@src/Util";

export interface IconSelectProps {
	id?: string;
	value?: IconOutput;
	onChange?: (icon: IconOutput) => void;
}
const IconSelect: FC<IconSelectProps> = memo(({ ...props }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<IconSelectModal
				open={open}
				closable
				onCancel={() => setOpen(false)}
				setValue={(iconSeqNo) => {
					setOpen(false);
					props?.onChange?.(iconSeqNo);
				}}
			/>
			<Space>
				{UtilCommon.nilToNull(props?.value?.seqNo, (seqNo) => (
					<CustomIcon key={seqNo} iconSeqNo={seqNo} />
				))}

				<Button type={"primary"} onClick={() => setOpen(!open)}>
					아이콘 선택
				</Button>
			</Space>
		</>
	);
});

export default IconSelect;
