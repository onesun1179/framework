import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import {
	FrontComponentsInput,
	FrontComponentsOutput,
	PagingInput,
} from "@gqlType";

export const FRMK_FRNT_CMPNT_MGMT_QUERY = gql`
	query FRMK_FRNT_CMPNT_MGMT(
		$paging: PagingInput
		$param: FrontComponentsInput
	) {
		frontComponents(pagingInput: $paging, frontComponentsInput: $param) {
			list {
				id
				name
				desc
				createdAt
				updatedAt
			}
			total
		}
	}
` as TypedDocumentNode<
	{
		frontComponents: FrontComponentsOutput;
	},
	{
		paging: PagingInput;
		param: FrontComponentsInput;
	}
>;

export const useFrmkFrntCmpntMgmtQuery = makeUseQuery(
	FRMK_FRNT_CMPNT_MGMT_QUERY
);
