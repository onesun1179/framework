import { gql, TypedDocumentNode } from "@apollo/client";
import { MenuOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const MENU_DETAILS_QUERY = gql`
	query MENU_DETAILS($menuSeqNo: Int!) {
		menu(seqNo: $menuSeqNo) {
			seqNo
			name
			iconSeqNo
			routeSeqNo
			desc
			createdAt
			updatedAt
		}
	}
` as TypedDocumentNode<
	{
		menu: Pick<
			MenuOutput,
			| "seqNo"
			| "name"
			| "iconSeqNo"
			| "routeSeqNo"
			| "desc"
			| "createdAt"
			| "updatedAt"
		>;
	},
	{
		menuSeqNo: number;
	}
>;

export const useMenuDetailsQuery = makeUseQuery(MENU_DETAILS_QUERY);
