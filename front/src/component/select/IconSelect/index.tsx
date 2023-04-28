import { FC, useState } from "react";
import { Button } from "antd";
import IconSelectModal from "@src/component/modal/IconSelectModal";
import { IconOutput } from "@gqlType";
import CustomIcon from "@src/component/common/CustomIcon";

export interface IconSelectProps {
	id?: string;
	value?: IconOutput;
	onChange?: (icon: IconOutput) => void;
}
const IconSelect: FC<IconSelectProps> = ({ ...props }) => {
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
			<div>
				<Button icon={<CustomIcon iconSeqNo={props?.value?.seqNo} />} />
				<Button type={"primary"} onClick={() => setOpen(!open)}>
					아이콘 선택
				</Button>
			</div>
		</>
	);
};

export default IconSelect;
