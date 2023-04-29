import React, { FC, useCallback } from "react";
import { Button, Form, Input, message } from "antd";
import { EntityFormActionType } from "@src/types";
import { CodeOutput } from "@gqlType";
import {
	useInsertCodeMutation,
	useUpdateCodeMutation,
} from "@src/component/form/code/mutations";
import { refetchQueryMap } from "@src/Util";
import FormDrawer, { FormDrawerProps } from "@src/component/common/FormDrawer";
import { FormInstance } from "antd/es/form";
import HiddenFormItem from "@src/component/common/HiddenFormItem";

export interface CdFormDrawerProps extends Omit<FormDrawerProps, "onSave"> {
	actionType?: EntityFormActionType;
	form: FormInstance<CodeOutput>;
}

const CdFormDrawer: FC<CdFormDrawerProps> = ({
	actionType,
	form,
	open,
	setOpen,
}) => {
	const [updateCodeMutate] = useUpdateCodeMutation({
		refetchQueries: refetchQueryMap.code,
	});
	const [insertCodeMutate] = useInsertCodeMutation({
		refetchQueries: refetchQueryMap.code,
	});
	const [messageApi, contextHolder] = message.useMessage();
	const onSave = useCallback(async () => {
		await form.validateFields();
		const record = form.getFieldsValue();

		switch (actionType) {
			case "insert":
				await insertCodeMutate({
					variables: {
						insertCodeInput: {
							name: record.name,
							desc: record.desc,
						},
					},
				});

				break;
			case "update":
				await updateCodeMutate({
					variables: {
						updateCodeInput: {
							seqNo: record.seqNo,
							name: record.name,
							desc: record.desc,
						},
					},
				});
				break;
		}
		setOpen(false);
		await messageApi.success("저장");
	}, [actionType, form, setOpen]);

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

export default CdFormDrawer;
