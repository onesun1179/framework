import React, { FC, useCallback } from "react";
import { Button, Form, Input, message } from "antd";
import { EntityFormActionType } from "@src/types";
import IconSelect from "@src/component/select/IconSelect";
import FormDrawer, { FormDrawerProps } from "@src/component/common/FormDrawer";
import HiddenFormItem from "@src/component/common/HiddenFormItem";
import { FormInstance } from "antd/es/form";
import { MenuOutput } from "@gqlType";
import { refetchQueryMap } from "@src/Util";
import {
	useInsertMenuMutation,
	useUpdateMenuMutation,
} from "@src/component/form/menu/mutations";

export interface MenuFormDrawerProps extends Omit<FormDrawerProps, "onSave"> {
	actionType?: EntityFormActionType;
	form: FormInstance<MenuOutput>;
}

const MenuFormDrawer: FC<MenuFormDrawerProps> = ({
	actionType,
	form,
	open,
	setOpen,
}) => {
	const [updateMutate] = useUpdateMenuMutation({
		refetchQueries: refetchQueryMap.menu,
	});
	const [insertMutate] = useInsertMenuMutation({
		refetchQueries: refetchQueryMap.menu,
	});
	const [messageApi, contextHolder] = message.useMessage();
	const onSave = useCallback(async () => {
		await form.validateFields();
		const record = form.getFieldsValue();
		switch (actionType) {
			case "insert":
				await insertMutate({
					variables: {
						insertMenuInput: {
							iconSeqNo: record.icon?.seqNo,
							desc: record.desc,
							name: record.name,
							routeSeqNo: record.routeSeqNo,
						},
					},
				});
				break;
			case "update":
				await updateMutate({
					variables: {
						updateMenuInput: {
							seqNo: record.seqNo,
							iconSeqNo: record.icon?.seqNo,
							desc: record.desc,
							name: record.name,
							routeSeqNo: record.routeSeqNo,
						},
					},
				});
				break;
		}
		setOpen(false);
		await messageApi.success("성공");
	}, [setOpen, messageApi, insertMutate, updateMutate, form, actionType]);
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
					<Form.Item label={`아이콘`} name={"icon"}>
						<IconSelect />
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

export default MenuFormDrawer;
