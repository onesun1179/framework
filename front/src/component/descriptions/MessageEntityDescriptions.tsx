import { FC } from "react";
import { Descriptions } from "antd";
import { MessageEntityOutput } from "@gqlType";

export interface MessageEntityDescriptionsProps {
	record?: MessageEntityOutput;
}
export const MessageEntityDescriptions: FC<MessageEntityDescriptionsProps> = ({
	record,
}) => {
	return (
		<Descriptions title="메세지" column={1}>
			<Descriptions.Item label="일련번호">{record?.seqNo}</Descriptions.Item>
			<Descriptions.Item label="이름">{record?.name}</Descriptions.Item>
			<Descriptions.Item label="그룹코드">
				{record?.groupCode}
			</Descriptions.Item>
			<Descriptions.Item label="코드">{record?.code}</Descriptions.Item>
			<Descriptions.Item label="메세지">{record?.text}</Descriptions.Item>
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
