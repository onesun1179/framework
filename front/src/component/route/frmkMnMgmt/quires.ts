import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import { MenusInput, MenusOutput, PagingInput } from "@gqlType";

export const FRMK_MN_MGMT_QUERY = gql`
	query MENUS($pagingInput: PagingInput, $menusInput: MenusInput) {
		menus(pagingInput: $pagingInput, menusInput: $menusInput) {
			list {
				seqNo
				name
				routeSeqNo
				desc
				updatedAt
				createdAt
				icon {
					seqNo
					fileFullPath
				}
				route {
					seqNo
					path
					frontComponentId
				}
			}
			total
		}
	}
` as TypedDocumentNode<
	{
		menus: MenusOutput;
	},
	{
		pagingInput: PagingInput;
		menusInput: MenusInput;
	}
>;

export const useFrmkMnMgmtQuery = makeUseQuery(FRMK_MN_MGMT_QUERY);
