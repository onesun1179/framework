import { FC, useState } from "react";
import { EditableRowContext } from "./EditableRowContext";
import { useForm } from "antd/es/form/Form";
import { Form } from "antd";

export interface EditableRowProps {
	record: Record<string, any>;
}
export const EditableRow: FC<EditableRowProps> = ({ record, ...props }) => {
	const [form] = useForm();
	const [enableInsertYn, setEnableInsertYn] = useState(false);
	const [enableUpdateYn, setEnableUpdateYn] = useState(false);
	const [enableDeleteYn, setEnableDeleteYn] = useState(true);

	return (
		<Form form={form} component={false}>
			<EditableRowContext.Provider
				value={{
					form,
					enableInsertYn,
					setEnableInsertYn,
					enableUpdateYn,
					setEnableUpdateYn,
					enableDeleteYn,
					setEnableDeleteYn,
				}}
			>
				<tr {...props} />
			</EditableRowContext.Provider>
		</Form>
	);
};
