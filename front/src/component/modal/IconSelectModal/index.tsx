import { FC, useState } from "react";
import {
	useIconSelectModal1Query,
	useIconSelectModal2Query,
} from "@src/component/select/IconSelect/quires";
import { Button, Col, Modal, ModalProps, Row, Segmented } from "antd";
import { chunk, isNil } from "lodash";
import SvgPathToIcon from "@src/component/common/SvgPathToIcon";
import { IconOutput } from "@gqlType";

export interface IconSelectModalProps extends Omit<ModalProps, "footer"> {
	initialLabelSeqNo?: number;
	setValue: (icon: IconOutput) => void;
}
const IconSelectModal: FC<IconSelectModalProps> = ({
	initialLabelSeqNo,
	setValue,
	...props
}) => {
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

				{chunk(data2.loading ? [] : data2.data?.icons.list, 14).map((o, i) => {
					return (
						<Row key={i}>
							{o.map((oo, ii) => (
								<Col key={ii}>
									<Button
										icon={<SvgPathToIcon filePath={oo.fileFullPath} />}
										onClick={() => setValue(oo)}
									/>
								</Col>
							))}
						</Row>
					);
				})}
				<div>test</div>
			</Modal>
		</>
	);
};

export default IconSelectModal;
