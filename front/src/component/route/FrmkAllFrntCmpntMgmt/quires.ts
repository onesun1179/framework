import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import {
	AllFrontComponentsInput,
	AllFrontComponentsOutput,
	PagingInput,
} from "@gqlType";

export const FRMK_All_FRNT_CMPNT_MGMT_QUERY = gql`
	query FRMK_All_FRNT_CMPNT_MGMT(
		$paging: PagingInput
		$param: AllFrontComponentsInput
	) {
		allFrontComponents(pagingInput: $paging, allFrontComponentsInput: $param) {
			list {
				id
				frontComponentId
				desc
				createdAt
				updatedAt
			}
			total
		}
	}
` as TypedDocumentNode<
	{
		allFrontComponents: AllFrontComponentsOutput;
	},
	{
		paging: PagingInput;
		param: AllFrontComponentsInput;
	}
>;

export const useFrmkAllFrntCmpntMgmtQuery = makeUseQuery(
	FRMK_All_FRNT_CMPNT_MGMT_QUERY
);
