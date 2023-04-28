import { FC, useState } from "react";
import { Button } from "antd";
import IconSelectModal from "@src/component/modal/IconSelectModal";
import { gql } from "@apollo/client";

const ICON_QUERY = gql`
	query ($seqNo: Int!) {
		icon(seqNo: $seqNo) {
			seqNo
			name
			fileFullPath
		}
	}
`;
export interface IconSelectProps {
	iconSeqNo?: number;
}
const IconSelect: FC<IconSelectProps> = ({ iconSeqNo }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<IconSelectModal open={open} closable onCancel={() => setOpen(false)} />
			<div>
				<Button type={"primary"} onClick={() => setOpen(!open)}>
					아이콘 선택
				</Button>
			</div>
		</>
	);
};

export default IconSelect;
