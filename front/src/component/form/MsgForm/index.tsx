import React, { FC, memo, useMemo } from "react";
import { ChkUniqMessageByCodeInput, MessageOutput } from "@gqlType";
import { Form, FormProps, Input } from "antd";
import { Index } from "@src/component/select";
import { useApolloClient } from "@apollo/client";
import { CHECK_UNIQUE } from "@src/component/form/MsgForm/quires";
import { EntityFormActionType } from "@src/types";

export interface MessageEntityFormProps extends FormProps {
	actionType?: EntityFormActionType;
}
const MessageEntityForm: FC<MessageEntityFormProps> = ({
	actionType,
	...props
}) => {
	const client = useApolloClient();
	const [form] = Form.useForm<MessageOutput>(props.form);
	const updateYn = useMemo(() => actionType === "update", [actionType]);
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
				query: CHECK_UNIQUE,
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
		<Form<MessageOutput> layout={"vertical"} {...props}>
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
			<Form.Item<string>
				label={`그룹코드`}
				name={"groupCode"}
				rules={[
					{
						required: true,
					},
					{
						async validator(rule, groupCode) {
							if (!updateYn) await checkUnique("groupCode", groupCode);
						},
					},
				]}
			>
				<Index disabled={updateYn} />
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
							if (!updateYn) await checkUnique("code", code);
						},
					},
				]}
			>
				<Input maxLength={4} minLength={4} disabled={updateYn} />
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
		</Form>
	);
};

export default memo(MessageEntityForm);
