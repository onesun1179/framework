import React, { FC, useCallback } from "react";
import { Button, Form, Input, message } from "antd";
import { RoleOutput } from "@gqlType";
import { refetchQueryMap } from "@src/Util";
import { EntityFormActionType } from "@src/types";
import FormDrawer, { FormDrawerProps } from "@src/component/common/FormDrawer";
import { FormInstance } from "antd/es/form";
import HiddenFormItem from "@src/component/common/HiddenFormItem";
import {
	useInsertRoleMutation,
	useUpdateRoleMutation,
} from "@src/component/form/role/mutations";
import RoleGroupSelect from "@src/component/select/RoleGroupSelect/RoleGroupSelect";

export interface RoleFormDrawerProps extends Omit<FormDrawerProps, "onSave"> {
	actionType?: EntityFormActionType;
	form: FormInstance<RoleOutput>;
}

const RoleFormDrawer: FC<RoleFormDrawerProps> = ({
	open,
	setOpen,
	actionType,
	form,
}) => {
	const [messageApi, contextHolder] = message.useMessage();
	const [updateMessageGroupMutate] = useUpdateRoleMutation({
		refetchQueries: refetchQueryMap.role,
	});
	const [insertMessageGroupMutate] = useInsertRoleMutation({
		refetchQueries: refetchQueryMap.role,
	});

	const onSave = useCallback(async () => {
		await form.validateFields();
		const record = form.getFieldsValue();
		switch (actionType) {
			case "insert":
				await insertMessageGroupMutate({
					variables: {
						insertRoleInput: {
							name: record.name,
							roleGroupSeqNo: record.roleGroupSeqNo,
							desc: record.desc,
						},
					},
				});

				break;
			case "update":
				await updateMessageGroupMutate({
					variables: {
						updateRoleInput: {
							seqNo: record.seqNo,
							name: record.name,
							roleGroupSeqNo: record.roleGroupSeqNo,
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
					{actionType === "update" && (
						<Form.Item
							label={`일련번호`}
							name={"seqNo"}
							rules={[
								{
									required: true,
								},
							]}
						>
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
					<Form.Item label={`권한 그룹명`} name={"roleGroupSeqNo"}>
						<RoleGroupSelect />
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

export default RoleFormDrawer;
