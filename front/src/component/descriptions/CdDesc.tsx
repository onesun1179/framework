import { FC } from "react";
import { Descriptions } from "antd";
import { CodeOutput } from "@gqlType";

export interface CdDescProps {
	record?: CodeOutput;
}

const CdDesc: FC<CdDescProps> = ({ record }) => {
	return (
		<Descriptions title="코드" column={1}>
			<Descriptions.Item label="일련번호">{record?.seqNo}</Descriptions.Item>
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

export default CdDesc;
