import React, { FC, useMemo } from "react";
import { Form, FormProps, Input } from "antd";
import { MenuOutput } from "@gqlType";
import { EntityFormActionType } from "@src/types";
import IconSelect from "@src/component/select/IconSelect";

export interface MenuFormProps extends FormProps {
	actionType?: EntityFormActionType;
}
const MenuForm: FC<MenuFormProps> = ({ actionType, ...props }) => {
	const updateYn = useMemo(() => actionType === "update", [actionType]);

	return (
		<Form<MenuOutput> layout={"vertical"} {...props}>
			{updateYn && (
				<Form.Item label={`ID`} name={"seqNo"}>
					<Input disabled />
				</Form.Item>
			)}
			<Form.Item
				label={`이름`}
				name={"name"}
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item label={`아이콘`} name={"icon"}>
				<IconSelect />
			</Form.Item>
			<Form.Item label={`비고`} name={"desc"}>
				<Input />
			</Form.Item>
		</Form>
	);
};

export default MenuForm;
