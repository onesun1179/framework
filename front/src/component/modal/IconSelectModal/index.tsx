import React, {
	ChangeEvent,
	FC,
	useCallback,
	useEffect,
	useState,
	useTransition,
} from "react";
import {
	useIconSelectModal1Query,
	useIconSelectModal2Query,
} from "@src/component/select/IconSelect/quires";
import {
	Button,
	Col,
	Input,
	Modal,
	ModalProps,
	Row,
	Segmented,
	Spin,
	Tooltip,
} from "antd";
import { chunk, isNil } from "lodash";
import SvgPathToIcon from "@src/component/common/SvgPathToIcon";
import { IconOutput } from "@gqlType";
import { SearchOutlined } from "@ant-design/icons";

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
	const [searchValue, setSearchValue] = useState<string>();
	const [isPending, startTransition] = useTransition();

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

	useEffect(() => {
		!isNil(data1.data) &&
			setIconLabelSeqNo(data1.data.iconLabels.list[0].seqNo);
	}, [data1.data]);

	const onInputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			startTransition(() => {
				setSearchValue(e.target.value);
			});
		},
		[setSearchValue, startTransition]
	);

	return (
		<>
			<Modal title="아이콘 선택" footer={null} {...props}>
				<Spin spinning={isPending}>
					<Segmented
						block
						value={iconLabelSeqNo}
						options={(data1.data?.iconLabels.list || []).map((o) => ({
							value: o.seqNo,
							label: o.name,
						}))}
						onChange={(o) => {
							setIconLabelSeqNo(o as number);
						}}
					/>
					<Input
						placeholder={"검색어를 입력해주세요."}
						value={searchValue}
						addonAfter={<SearchOutlined />}
						allowClear
						onChange={onInputChange}
					/>
					{chunk(
						data2.loading
							? []
							: searchValue
							? data2.data?.icons.list.filter((o) =>
									o.name.match(new RegExp(searchValue, "g"))
							  )
							: data2.data?.icons.list,
						14
					).map((o, i) => (
						<Row key={i}>
							{o.map((oo, ii) => (
								<Col key={ii}>
									<Tooltip title={oo.name}>
										<Button
											icon={<SvgPathToIcon filePath={oo.fileFullPath} />}
											onClick={() => setValue(oo)}
										/>
									</Tooltip>
								</Col>
							))}
						</Row>
					))}
				</Spin>
			</Modal>
		</>
	);
};

export default IconSelectModal;
