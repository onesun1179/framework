import React, { FC, useCallback } from "react";
import { Button, Form, Input, message } from "antd";
import { EntityFormActionType } from "@src/types";
import { AllFrontComponentOutput } from "@gqlType";
import FCSelect from "@src/component/select/fCSelect/FCSelect";
import FormDrawer, { FormDrawerProps } from "@src/component/common/FormDrawer";
import { FormInstance } from "antd/es/form";
import { refetchQueryMap } from "@src/Util";
import {
	useChkUniqByAllFcIdMutation,
	useInsertAllFrontComponentMutation,
	useUpdateAllFrontComponentMutation,
} from "@src/component/form/allFrontComponent/mutations";
import HiddenFormItem from "@src/component/common/HiddenFormItem";

export interface AllFCFormDrawerProps extends Omit<FormDrawerProps, "onSave"> {
	actionType?: EntityFormActionType;
	form: FormInstance<AllFrontComponentOutput>;
}

const AllFCFormDrawer: FC<AllFCFormDrawerProps> = ({
	actionType,
	form,
	open,
	setOpen,
}) => {
	const [updateMutate] = useUpdateAllFrontComponentMutation({
		refetchQueries: refetchQueryMap.allFrontComponent,
	});
	const [insertMutate] = useInsertAllFrontComponentMutation({
		refetchQueries: refetchQueryMap.allFrontComponent,
	});
	const [chkUniqByAllFcIdMutate] = useChkUniqByAllFcIdMutation();
	const [messageApi, contextHolder] = message.useMessage();
	const chkUniqByAllFcId = async (id: string) => {
		const { data } = await chkUniqByAllFcIdMutate({
			variables: {
				chkUniqByAllFcIdInput: {
					id: id,
				},
			},
		});

		if (!data!.result) {
			return Promise.reject("중복된 ID가 존재합니다.");
		}
	};

	const onSave = useCallback(async () => {
		await form.validateFields();
		const record = form.getFieldsValue();
		switch (actionType) {
			case "insert":
				await insertMutate({
					variables: {
						insertAllFrontComponentInput: {
							id: record.id,
							frontComponentId: record.frontComponentId,
							desc: record.desc,
						},
					},
				});
				break;
			case "update":
				await updateMutate({
					variables: {
						updateAllFrontComponentInput: {
							id: record.id,
							frontComponentId: record.frontComponentId,
							desc: record.desc,
						},
					},
				});
				break;
		}
		setOpen(false);
		await messageApi.success("성공");
	}, [form, actionType, updateMutate, insertMutate]);

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
							{
								async validator(rule, id) {
									if (id && actionType === "insert") await chkUniqByAllFcId(id);
								},
							},
						]}
					>
						<Input disabled={actionType === "update"} />
					</Form.Item>
					<Form.Item<string>
						label={`화면 컴포넌트 ID`}
						name={"frontComponentId"}
					>
						<FCSelect />
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

export default AllFCFormDrawer;
