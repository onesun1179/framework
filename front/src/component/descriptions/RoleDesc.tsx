import { FC } from "react";
import { Descriptions } from "antd";
import { RoleOutput } from "@gqlType";

export interface RoleDescProps {
	record?: RoleOutput;
}

const RoleDesc: FC<RoleDescProps> = ({ record }) => {
	return (
		<Descriptions title="권한" column={1}>
			<Descriptions.Item label="이름">{record?.name}</Descriptions.Item>
			<Descriptions.Item label="그룹명">
				{record?.roleGroup?.name}
			</Descriptions.Item>
			<Descriptions.Item label="식별자">{record?.identifier}</Descriptions.Item>
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

export default RoleDesc;
