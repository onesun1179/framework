import { FC } from "react";
import { Descriptions } from "antd";
import { FrontComponentEntityOutput } from "@gqlType";

export interface FrontComponentEntityDescriptionsProps {
	record?: FrontComponentEntityOutput;
}
export const FrontComponentEntityDescriptions: FC<
	FrontComponentEntityDescriptionsProps
> = ({ record }) => {
	return (
		<Descriptions title="컴포넌트" column={1}>
			<Descriptions.Item label="ID">{record?.id}</Descriptions.Item>
			<Descriptions.Item label="이름">{record?.name}</Descriptions.Item>
			<Descriptions.Item label="비고">{record?.desc}</Descriptions.Item>
			<Descriptions.Item label="생성일자">
				{record?.createdAt}
			</Descriptions.Item>
			<Descriptions.Item label="수정일자">
				{record?.updatedAt}
			</Descriptions.Item>
		</Descriptions>
	);
};