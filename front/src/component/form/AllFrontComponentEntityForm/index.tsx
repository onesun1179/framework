import React, { FC, memo, useMemo } from "react";
import {
	AllFrontComponentEntityOutput,
	MessageGroupEntityOutput,
} from "@gqlType";
import { Form, FormProps, Input } from "antd";
import { useApolloClient } from "@apollo/client";
import { EntityFormActionType } from "@src/types";
import { FrontComponentEntitiesSelect } from "@src/component/select/FrontComponentEntitiesSelect";
import { CHK_UNIQ_BY_ALL_FC_ID } from "@src/component/form/AllFrontComponentEntityForm/quires";

export interface AllFrontComponentEntityFormProps extends FormProps {
	actionType?: EntityFormActionType;
}

const AllFrontComponentEntityForm: FC<AllFrontComponentEntityFormProps> = ({
	actionType,
	...props
}) => {
	const client = useApolloClient();
	const [form] = Form.useForm<MessageGroupEntityOutput>(props.form);
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
		<Form<AllFrontComponentEntityOutput> layout={"vertical"} {...props}>
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
				<FrontComponentEntitiesSelect />
			</Form.Item>

			<Form.Item label={`비고`} name={"desc"}>
				<Input />
			</Form.Item>
			{updateYn && (
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

export default memo(AllFrontComponentEntityForm);
