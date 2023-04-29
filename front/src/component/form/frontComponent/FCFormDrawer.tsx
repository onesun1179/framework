import React, { FC, memo, useCallback } from "react";
import { Button, Form, Input, message } from "antd";
import { EntityFormActionType } from "@src/types";
import { FrontComponentOutput } from "@gqlType";
import FormDrawer, { FormDrawerProps } from "@src/component/common/FormDrawer";
import { FormInstance } from "antd/es/form";
import HiddenFormItem from "@src/component/common/HiddenFormItem";
import {
	useInsertFrontComponentMutation,
	useUpdateFrontComponentMutation,
} from "@src/component/form/frontComponent/mutations";
import { refetchQueryMap } from "@src/Util";

export interface FCFormProps extends Omit<FormDrawerProps, "onSave"> {
	actionType?: EntityFormActionType;
	form: FormInstance<FrontComponentOutput>;
}

const FCFormDrawer: FC<FCFormProps> = ({ actionType, form, open, setOpen }) => {
	const [insertMutate] = useInsertFrontComponentMutation({
		refetchQueries: [
			...refetchQueryMap.frontComponent,
			...refetchQueryMap.allFrontComponent,
		],
	});
	const [updateMutate] = useUpdateFrontComponentMutation({
		refetchQueries: [
			...refetchQueryMap.frontComponent,
			...refetchQueryMap.allFrontComponent,
		],
	});
	const [messageApi, contextHolder] = message.useMessage();

	const onSave = useCallback(async () => {
		await form.validateFields();
		const record = form.getFieldsValue();

		switch (actionType) {
			case "insert":
				await insertMutate({
					variables: {
						insertFrontComponentInput: {
							id: record.id,
							name: record.name,
							desc: record.desc,
						},
					},
				});
				break;
			case "update":
				await updateMutate({
					variables: {
						updateFrontComponentInput: {
							id: record.id,
							name: record.name,
							desc: record.desc,
						},
					},
				});
				break;
		}
		setOpen(false);
		await messageApi.success("성공");
	}, [setOpen, actionType, messageApi, insertMutate, updateMutate]);
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
						label={`ID`}
						name={"id"}
						rules={[
							{
								required: true,
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

export default memo(FCFormDrawer);
