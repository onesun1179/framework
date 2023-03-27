import { FC } from "react";
import { gql, useQuery } from "@apollo/client";
import { Menu, MenusRequest, PagingRequest } from "@gqlType";

const QUERY = gql`
	query ($paging: PagingRequest!, $param: MenusRequest!) {
		menus(paging: $paging, param: $param) {
			list {
				seqNo
			}
			total
		}
	}
`;

type Req = {
	param: MenusRequest;
	paging: PagingRequest;
};
type Res = {
	menus: Pick<Menu, "seqNo" | "name" | "createdAt" | "desc" | "updatedAt">;
};

const MenuManagement: FC = () => {
	const { data } = useQuery<Res, Req>(QUERY, {
		variables: {
			paging: {
				skip: 0,
				take: 50,
			},
			param: {},
		},
	});
	console.log(data);
	return <>{`MenuManagement`}</>;
};

export default MenuManagement;
