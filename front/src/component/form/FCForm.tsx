import React, { FC, memo, useMemo } from "react";
import { Form, FormProps, Input } from "antd";
import { useApolloClient } from "@apollo/client";
import { EntityFormActionType } from "@src/types";
import { FrontComponentOutput } from "@src/graphql-type";

export interface FrontComponentEntityFormProps extends FormProps {
	actionType?: EntityFormActionType;
}
const FCForm: FC<FrontComponentEntityFormProps> = ({
	actionType,
	...props
}) => {
	const client = useApolloClient();
	const [form] = Form.useForm<FrontComponentOutput>(props.form);
	const updateYn = useMemo(() => actionType === "update", [actionType]);

	return (
		<Form<FrontComponentOutput> layout={"vertical"} {...props}>
			<Form.Item
				label={`ID`}
				name={"id"}
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input disabled={updateYn} />
			</Form.Item>
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
			<Form.Item label={`비고`} name={"desc"}>
				<Input />
			</Form.Item>
		</Form>
	);
};

export default memo(FCForm);
