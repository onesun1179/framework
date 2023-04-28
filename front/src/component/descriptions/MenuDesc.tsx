import { FC } from "react";
import { Descriptions } from "antd";
import { MenuOutput } from "@gqlType";
import SvgPathToIcon from "@src/component/common/SvgPathToIcon";

export interface MenuDescProps {
	record?: MenuOutput;
}
const MenuDesc: FC<MenuDescProps> = ({ record }) => {
	return (
		<Descriptions title="메뉴" column={1}>
			<Descriptions.Item label="일련번호">{record?.seqNo}</Descriptions.Item>
			<Descriptions.Item label="이름">{record?.name}</Descriptions.Item>
			<Descriptions.Item label="아이콘">
				{record?.icon ? (
					<SvgPathToIcon filePath={record.icon.fileFullPath} />
				) : null}
			</Descriptions.Item>
			<Descriptions.Item label="라우트 경로">
				{record?.route?.path}
			</Descriptions.Item>
			<Descriptions.Item label="라우트 화면 컴포넌트">
				{record?.route?.frontComponentId}
			</Descriptions.Item>
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

export default MenuDesc;
