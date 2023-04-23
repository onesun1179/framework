import React, { FC, useMemo } from "react";
import { MessageEntityOutput, MessageGroupEntityOutput } from "@gqlType";
import { Form, FormProps, Input } from "antd";
import { gql, useApolloClient } from "@apollo/client";

export const ENABLE_MESSAGE_GROUP_OF_CODE_QUERY = gql`
	query ENABLE_MESSAGE_GROUP_OF_CODE($code: String!) {
		enableMessageGroupOfCode(code: $code)
	}
`;
export type MessageGroupEntityFormActionType = "update" | "insert";
export interface MessageGroupEntityFormProps extends FormProps {
	actionType?: MessageGroupEntityFormActionType;
}
export const MessageGroupEntityForm: FC<MessageGroupEntityFormProps> = ({
	actionType,
	...props
}) => {
	const client = useApolloClient();
	const [form] = Form.useForm<MessageGroupEntityOutput>(props.form);
	const updateYn = useMemo(() => actionType === "update", [actionType]);
	const enableMessageGroupOfCode = async (code: string) => {
		const { data } = await client.query<
			{
				enableMessageGroupOfCode: boolean;
			},
			{
				code: string;
			}
		>({
			query: ENABLE_MESSAGE_GROUP_OF_CODE_QUERY,
			variables: {
				code,
			},
		});

		if (!data!.enableMessageGroupOfCode) {
			return Promise.reject("중복된 코드가 존재합니다.");
		}
	};

	return (
		<Form<MessageEntityOutput> layout={"vertical"} {...props}>
			<Form.Item
				label={`코드`}
				name={"code"}
				rules={[
					{
						required: true,
					},
					{
						async validator(rule, groupCode) {
							if (groupCode && !updateYn)
								await enableMessageGroupOfCode(groupCode);
						},
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
