import React, { FC, useCallback, useMemo } from "react";
import { ChkUniqMessageByCodeInput, MessageOutput } from "@gqlType";
import { Button, Form, Input, message } from "antd";
import { MsgGrpSelect } from "@src/component/select";
import { EntityFormActionType } from "@src/types";
import { refetchQueryMap, UtilRefetch } from "@src/Util";
import FormDrawer, { FormDrawerProps } from "@src/component/common/FormDrawer";
import { FormInstance } from "antd/es/form";
import {
	useChkUniqMessageByCodeMutation,
	useInsertMessageMutation,
	useUpdateMessageMutation,
} from "@src/component/form/message/mutations";
import HiddenFormItem from "@src/component/common/HiddenFormItem";

export interface MsgFormDrawerProps extends Omit<FormDrawerProps, "onSave"> {
	actionType?: EntityFormActionType;
	form: FormInstance<MessageOutput>;
}

const MsgFormDrawer: FC<MsgFormDrawerProps> = ({
	open,
	setOpen,
	actionType,
	form,
}) => {
	const [insertMessageMutate] = useInsertMessageMutation({
		refetchQueries: [
			...refetchQueryMap.message,
			...refetchQueryMap.messageGroup,
		],
	});
	const [updateMessageMutate] = useUpdateMessageMutation({
		refetchQueries: [
			...refetchQueryMap.message,
			...refetchQueryMap.messageGroup,
		],
	});

	const [chkUniqMessageByCodeMuate] = useChkUniqMessageByCodeMutation();
	const [messageApi, contextHolder] = message.useMessage();
	const updateYn = useMemo(() => actionType === "update", [actionType]);
	const checkUnique = useCallback(
		async (col: "code" | "groupCode", value: string) => {
			const _t = col === "code" ? "groupCode" : "code";
			const _v = form.getFieldValue(_t) as string;
			const codeV = col === "code" ? value : _v;
			if (_v && value && codeV.length === 4) {
				const { data } = await chkUniqMessageByCodeMuate({
					variables: {
						input: {
							[_t]: _v,
							[col]: value,
						} as unknown as ChkUniqMessageByCodeInput,
					},
				});

				if (!data!.result) {
					return Promise.reject("중복된 코드가 존재합니다.");
				}
			}
		},
		[]
	);

	const onSave = useCallback(async () => {
		await form.validateFields();
		const record = form.getFieldsValue();
		switch (actionType) {
			case "insert":
				await insertMessageMutate({
					variables: {
						insertMessageInput: {
							groupCode: record.groupCode,
							name: record.name,
							text: record.text,
							code: record.code,
							desc: record.desc,
						},
					},
				});

				await UtilRefetch.message();
				break;
			case "update":
				await updateMessageMutate({
					variables: {
						updateMessageInput: {
							seqNo: record.seqNo,
							name: record.name,
							text: record.text,
							desc: record.desc,
						},
					},
				});
				await UtilRefetch.message();
				break;
		}
		setOpen(false);
		await messageApi.success("성공");
	}, [form, setOpen, messageApi, actionType]);

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
						<MsgGrpSelect disabled={updateYn} />
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
					<HiddenFormItem>
						<Button htmlType={"submit"} />
					</HiddenFormItem>
				</Form>
			</FormDrawer>
		</>
	);
};

export default MsgFormDrawer;
