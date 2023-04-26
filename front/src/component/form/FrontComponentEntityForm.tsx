import React, { FC, memo, useMemo } from "react";
import { FrontComponentEntityOutput } from "@gqlType";
import { Form, FormProps, Input } from "antd";
import { useApolloClient } from "@apollo/client";
import { EntityFormActionType } from "@src/types";

export interface FrontComponentEntityFormProps extends FormProps {
	actionType?: EntityFormActionType;
}
const FrontComponentEntityForm: FC<FrontComponentEntityFormProps> = ({
	actionType,
	...props
}) => {
	const client = useApolloClient();
	const [form] = Form.useForm<FrontComponentEntityOutput>(props.form);
	const updateYn = useMemo(() => actionType === "update", [actionType]);

	return (
		<Form<FrontComponentEntityOutput> layout={"vertical"} {...props}>
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
			{updateYn && (
				<>
					<Form.Item label={`생성일자`} name={"createdAt"}>
						<Input disabled />
					</Form.Item>
					<Form.Item label={`수정일자`} name={"updatedAt"}>
						<Input disabled />
					</Form.Item>
				</>
			)}
		</Form>
	);
};

export default memo(FrontComponentEntityForm);
