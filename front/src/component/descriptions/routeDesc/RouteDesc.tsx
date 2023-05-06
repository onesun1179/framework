import { FC, memo } from "react";
import { Collapse, Descriptions, Skeleton } from "antd";
import { useRouteDetailsQuery } from "@src/component/descriptions/routeDesc/routeDesc.query";
import { UtilCommon } from "@src/Util";
import withDesc, { DescProps } from "@src/component/descriptions/withDesc";
import { Link } from "react-router-dom";

export type RouteDescProps = DescProps & {
	routeSeqNo: number;
};
const RouteDesc: FC<RouteDescProps> = memo(({ routeSeqNo, descProps }) => {
	const { data } = useRouteDetailsQuery({
		variables: {
			routeSeqNo,
		},
	});
	return UtilCommon.nilToNull(
		data,
		(data) => (
			<>
				<Descriptions {...descProps}>
					<Descriptions.Item label="일련번호">
						{data.route.seqNo}
					</Descriptions.Item>
					<Descriptions.Item label="경로">{data.route.path}</Descriptions.Item>
					<Descriptions.Item label="자식 라우트 총 갯수">
						{data.route.treeInfo.childCount}
					</Descriptions.Item>
					<Descriptions.Item label="depth">
						{data.route.treeInfo.depth}
					</Descriptions.Item>
					<Descriptions.Item label="풀 경로">
						<Link to={data.route.treeInfo.fullPath}>
							{data.route.treeInfo.fullPath}
						</Link>
					</Descriptions.Item>
					<Descriptions.Item label="비고">{data.route.desc}</Descriptions.Item>
					<Descriptions.Item label="생성일자">
						{data.route.createdAt}
					</Descriptions.Item>
					<Descriptions.Item label="수정일자">
						{data.route.updatedAt}
					</Descriptions.Item>
				</Descriptions>
				{UtilCommon.nilToNull(data.route.parentSeqNo, (parentSeqNo) => (
					<Collapse>
						<Collapse.Panel key={"route"} header={"부모 라우트 정보"}>
							<RouteDesc
								routeSeqNo={parentSeqNo}
								titleYn={false}
								descProps={{
									column: 1,
								}}
							/>
						</Collapse.Panel>
					</Collapse>
				))}
			</>
		),
		<Skeleton />
	);
});

export default withDesc(RouteDesc, {
	title: "라우트 정보",
	column: 1,
});
