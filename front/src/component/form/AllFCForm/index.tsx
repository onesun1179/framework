import React, { FC, memo, useMemo } from "react";
import { Form, FormProps, Input } from "antd";
import { useApolloClient } from "@apollo/client";
import { EntityFormActionType } from "@src/types";
import { CHK_UNIQ_BY_ALL_FC_ID } from "@src/component/form/AllFCForm/quires";
import { AllFrontComponentOutput, MessageGroupOutput } from "@gqlType";
import FCSelect from "@src/component/select/FCSelect";

export interface AllFCFormProps extends FormProps {
	actionType?: EntityFormActionType;
}

const AllFCForm: FC<AllFCFormProps> = ({ actionType, ...props }) => {
	const client = useApolloClient();
	const [form] = Form.useForm<MessageGroupOutput>(props.form);
	const updateYn = useMemo(() => actionType === "update", [actionType]);
	const chkUniqByAllFcId = async (id: string) => {
		const { data } = await client.query({
			query: CHK_UNIQ_BY_ALL_FC_ID,
			variables: {
				input: {
					id: id,
				},
			},
		});

		if (!data!.chkUniqByAllFcId) {
			return Promise.reject("중복된 ID가 존재합니다.");
		}
	};

	return (
		<Form<AllFrontComponentOutput> layout={"vertical"} {...props}>
			<Form.Item
				label={`ID`}
				name={"id"}
				rules={[
					{
						required: true,
					},
					{
						async validator(rule, id) {
							if (id && !updateYn) await chkUniqByAllFcId(id);
						},
					},
				]}
			>
				<Input disabled={updateYn} />
			</Form.Item>
			<Form.Item<string> label={`화면 컴포넌트 ID`} name={"frontComponentId"}>
				<FCSelect />
			</Form.Item>

			<Form.Item label={`비고`} name={"desc"}>
				<Input />
			</Form.Item>
		</Form>
	);
};

export default memo(AllFCForm);
