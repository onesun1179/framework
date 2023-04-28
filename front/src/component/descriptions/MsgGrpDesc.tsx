import { FC } from "react";
import { Descriptions } from "antd";
import { MessageGroupOutput } from "@gqlType";

export interface MsgGrpDescProps {
	record?: MessageGroupOutput;
}
const MsgGrpDesc: FC<MsgGrpDescProps> = ({ record }) => {
	return (
		<Descriptions title="메세지 그룹" column={1}>
			<Descriptions.Item label="코드">{record?.code}</Descriptions.Item>
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

export default MsgGrpDesc;
