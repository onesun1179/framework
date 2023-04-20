import React, { FC } from "react";
import { ChkUniqMessageByCodeInput, MessageEntityOutput } from "@gqlType";
import { Form, FormProps, Input } from "antd";
import { MessageGroupEntitiesSelect } from "@src/component/select";
import { gql, useApolloClient } from "@apollo/client";

const CHECK_UNIQUE_QUERY = gql`
	query CHECK_UNIQUE_QUERY($input: ChkUniqMessageByCodeInput!) {
		chkUniqMessageByCode(input: $input)
	}
`;
export type MessageEntityFormActionType = "update" | "insert";
export interface MessageEntityFormProps extends FormProps {
	actionType?: MessageEntityFormActionType;
}
export const MessageEntityForm: FC<MessageEntityFormProps> = ({
	actionType,
	...props
}) => {
	const client = useApolloClient();
	const [form] = Form.useForm<MessageEntityOutput>(props.form);
	const checkUnique = async (col: "code" | "groupCode", value: string) => {
		const _t = col === "code" ? "groupCode" : "code";
		const _v = form.getFieldValue(_t) as string;
		const codeV = col === "code" ? value : _v;
		if (_v && value && codeV.length === 4) {
			const { data } = await client.query<
				{
					chkUniqMessageByCode: boolean;
				},
				{
					input: ChkUniqMessageByCodeInput;
				}
			>({
				query: CHECK_UNIQUE_QUERY,
				variables: {
					input: {
						[_t]: _v,
						[col]: value,
					} as unknown as ChkUniqMessageByCodeInput,
				},
			});

			if (!data!.chkUniqMessageByCode) {
				return Promise.reject("중복된 코드가 존재합니다.");
			}
		}
	};

	return (
		<Form<MessageEntityOutput> layout={"vertical"} {...props}>
			{actionType === "update" && (
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
			<Form.Item<string>
				label={`그룹코드`}
				name={"groupCode"}
				rules={[
					{
						required: true,
					},
					{
						async validator(rule, groupCode) {
							await checkUnique("groupCode", groupCode);
						},
					},
				]}
			>
				<MessageGroupEntitiesSelect />
			</Form.Item>
			<Form.Item
				label={`코드`}
				name={"code"}
				rules={[
					{
						required: true,
					},
					{
						type: "string",
						len: 4,
					},
					{
						async validator(rule, code) {
							await checkUnique("code", code);
						},
					},
				]}
			>
				<Input maxLength={4} minLength={4} />
			</Form.Item>
			<Form.Item
				label={`메세지`}
				name={"text"}
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
			{actionType === "update" && (
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
