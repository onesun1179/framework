import { FC, useState } from "react";
import {
	useIconSelectModal1Query,
	useIconSelectModal2Query,
} from "@src/component/select/IconSelect/quires";
import { Modal, ModalProps, Segmented } from "antd";
import { isNil } from "lodash";

export interface IconSelectModalProps extends Omit<ModalProps, "footer"> {}
const IconSelectModal: FC<IconSelectModalProps> = ({ ...props }) => {
	const [iconLabelSeqNo, setIconLabelSeqNo] = useState<number>();
	const data1 = useIconSelectModal1Query();
	const data2 = useIconSelectModal2Query({
		skip: isNil(iconLabelSeqNo) || !props.open,
		variables: {
			iconsInput: {
				search: {
					iconLabel: {
						seqNo: {
							equal: {
								value: iconLabelSeqNo!,
							},
						},
					},
				},
			},
		},
	});

	return (
		<>
			<Modal title="아이콘 선택" footer={null} {...props}>
				<Segmented
					block
					options={(data1.data?.iconLabels.list || []).map((o) => ({
						value: o.seqNo,
						label: o.name,
					}))}
					onChange={(o) => {
						setIconLabelSeqNo(o as number);
					}}
				/>
				<div>test</div>
			</Modal>
		</>
	);
};

export default IconSelectModal;
