import { FC } from "react";
import { Collapse, Descriptions } from "antd";
import CustomIcon from "@src/component/common/customIcon/CustomIcon";
import { UtilCommon } from "@src/Util";
import { useMenuDetailsQuery } from "@src/component/descriptions/menuDesc/menuDesc.query";
import RouteDesc from "@src/component/descriptions/routeDesc/RouteDesc";
import withDesc, { DescProps } from "@src/component/descriptions/withDesc";

export interface MenuDescProps extends DescProps {
	menuSeqNo: number;
}
const MenuDesc: FC<MenuDescProps> = ({ menuSeqNo, descProps }) => {
	const { data } = useMenuDetailsQuery({
		variables: {
			menuSeqNo,
		},
	});

	if (!data) {
		return null;
	}

	return (
		<>
			<Descriptions {...descProps}>
				<Descriptions.Item label="일련번호">
					{data.menu.seqNo}
				</Descriptions.Item>
				<Descriptions.Item label="이름">{data.menu.name}</Descriptions.Item>
				<Descriptions.Item label="아이콘">
					{UtilCommon.nilToNull(data.menu.iconSeqNo, (iconSeqNo) => (
						<CustomIcon iconSeqNo={iconSeqNo} />
					))}
				</Descriptions.Item>
				<Descriptions.Item label="비고">{data.menu.desc}</Descriptions.Item>
				<Descriptions.Item label="생성일자">
					{data.menu.createdAt}
				</Descriptions.Item>
				<Descriptions.Item label="수정일자">
					{data.menu.updatedAt}
				</Descriptions.Item>
			</Descriptions>

			{UtilCommon.nilToNull(data.menu.routeSeqNo, (routeSeqNo) => (
				<Collapse>
					<Collapse.Panel key={"route"} header={"라우트 정보"}>
						<RouteDesc routeSeqNo={routeSeqNo} titleYn={false} />
					</Collapse.Panel>
				</Collapse>
			))}
		</>
	);
};

export default withDesc(MenuDesc, {
	title: "메뉴",
	column: 1,
});
