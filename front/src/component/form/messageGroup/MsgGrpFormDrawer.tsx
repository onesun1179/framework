import React, { FC, useCallback } from "react";
import { Button, Form, Input, message } from "antd";
import { useApolloClient } from "@apollo/client";
import { MessageGroupOutput } from "@gqlType";
import {
	useEnableMessageGroupOfCodeMutation,
	useInsertMessageGroupMutation,
	useUpdateMessageGroupMutation,
} from "@src/component/form/messageGroup/mutations";
import { refetchQueryMap } from "@src/Util";
import { EntityFormActionType } from "@src/types";
import FormDrawer, { FormDrawerProps } from "@src/component/common/FormDrawer";
import { FormInstance } from "antd/es/form";
import HiddenFormItem from "@src/component/common/HiddenFormItem";

export interface MsgGrpFormDrawerProps extends Omit<FormDrawerProps, "onSave"> {
	actionType?: EntityFormActionType;
	form: FormInstance<MessageGroupOutput>;
}

const MsgGrpFormDrawer: FC<MsgGrpFormDrawerProps> = ({
	open,
	setOpen,
	actionType,
	form,
}) => {
	const [messageApi, contextHolder] = message.useMessage();
	const [updateMessageGroupMutate] = useUpdateMessageGroupMutation({
		refetchQueries: refetchQueryMap.messageGroup,
	});
	const [insertMessageGroupMutate] = useInsertMessageGroupMutation({
		refetchQueries: refetchQueryMap.messageGroup,
	});
	const [enableMessageGroupOfCodeMutate] =
		useEnableMessageGroupOfCodeMutation();
	const client = useApolloClient();
	const enableMessageGroupOfCode = useCallback(
		async (code: string) => {
			const { data } = await enableMessageGroupOfCodeMutate({
				variables: {
					code,
				},
			});

			if (!data!.result) {
				return Promise.reject("중복된 코드가 존재합니다.");
			}
		},
		[client]
	);

	const onSave = useCallback(async () => {
		await form.validateFields();
		const record = form.getFieldsValue();
		switch (actionType) {
			case "insert":
				await insertMessageGroupMutate({
					variables: {
						insertMessageGroupInput: {
							name: record.name,
							code: record.code,
							desc: record.desc,
						},
					},
				});

				break;
			case "update":
				await updateMessageGroupMutate({
					variables: {
						updateMessageGroupInput: {
							name: record.name,
							code: record.code,
							desc: record.desc,
						},
					},
				});
				break;
		}
		setOpen(false);
		await messageApi.success("성공");
	}, [form, messageApi, actionType, setOpen]);

	return (
		<>
			{contextHolder}
			<FormDrawer onSave={onSave} open={open} setOpen={setOpen}>
				<Form
					autoComplete={"off"}
					layout={"vertical"}
					onFinish={onSave}
					form={form}
				>
					<Form.Item
						label={`코드`}
						name={"code"}
						rules={[
							{
								required: true,
							},
							{
								async validator(rule, groupCode) {
									if (groupCode && actionType === "insert")
										await enableMessageGroupOfCode(groupCode);
								},
							},
						]}
					>
						<Input disabled={actionType === "update"} />
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
					<HiddenFormItem>
						<Button htmlType={"submit"} />
					</HiddenFormItem>
				</Form>
			</FormDrawer>
		</>
	);
};

export default MsgGrpFormDrawer;
