import {
	FC,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Form, Input, InputRef } from "antd";
import { EditableRowContext } from "@src/component/table/editable/EditableRowContext";
import {
	EditableNumber,
	EditableString,
} from "@src/component/table/editable/EditableTable";
import { omit } from "lodash";
import styled from "styled-components";

export interface EditableCellProps<Item = Record<string, any>> {
	edit: EditableString | EditableNumber;
	children?: ReactNode;
	dataIndex: keyof Item;
	record: Item;
	initialRecord: Item;
	handleSave: (data: Item) => void;
}

export const EditableCell: FC<EditableCellProps> = ({ children, ...props }) => {
	let childNode = children;
	if (props.edit) {
		childNode = <EditableToggleCell {...props} children={children} />;
	}
	return (
		<td
			{...omit(props, [
				"edit",
				"record",
				"dataIndex",
				"handleSave",
				"initialRecord",
			])}
		>
			{childNode}
		</td>
	);
};

const StyledDiv = styled.div`
	:hover {
		cursor: pointer;
		border: 1px solid #d9d9d9;
		border-radius: 2px;
	}
`;

const EditableToggleCell: FC<EditableCellProps> = ({
	edit,
	children,
	dataIndex,
	handleSave,
	initialRecord,
	record,
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef<InputRef>(null);
	const { form, setEnableUpdateYn } = useContext(EditableRowContext)!;
	const differYn = useMemo(
		() => initialRecord[dataIndex] !== record[dataIndex],
		[dataIndex, initialRecord, record]
	);
	const [history, setHistory] = useState<Array<typeof record>>([]);

	useEffect(() => {
		if (initialRecord[dataIndex] !== record[dataIndex]) {
			setHistory((prev) => [...prev, record[dataIndex]]);
		}
	}, [initialRecord, record, dataIndex]);
	useEffect(() => {
		setEnableUpdateYn(differYn);
	}, [differYn]);

	useEffect(() => {
		if (editing) {
			inputRef.current?.focus({
				cursor: "all",
			});
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({ [dataIndex]: record[dataIndex] });
	};

	const save = async () => {
		try {
			const values = await form.validateFields();

			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log("Save failed:", errInfo);
		}
	};

	if (editing) {
		return (
			<Form.Item style={{ margin: 0 }} name={dataIndex} rules={edit?.rules}>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		);
	} else {
		return (
			<StyledDiv
				onClick={toggleEdit}
				style={{
					color: differYn ? "red" : "black",
				}}
			>
				{children}
			</StyledDiv>
		);
	}
};
