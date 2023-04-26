import { gql, TypedDocumentNode } from "@apollo/client";
import {
	AllFrontComponentEntitiesInput,
	AllFrontComponentEntitiesOutput,
	PagingInput,
} from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const FRMK_All_FRNT_CMPNT_MGMT_DATA = gql`
	query FRMK_All_FRNT_CMPNT_MGMT_DATA(
		$paging: PagingInput
		$param: AllFrontComponentEntitiesInput
	) {
		allFrontComponentEntities(
			pagingInput: $paging
			allFrontComponentEntitiesInput: $param
		) {
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
		allFrontComponentEntities: AllFrontComponentEntitiesOutput;
	},
	{
		paging: PagingInput;
		param: AllFrontComponentEntitiesInput;
	}
>;

export const useAllFrmkFrntCmpntMgmtData = makeUseQuery(
	FRMK_All_FRNT_CMPNT_MGMT_DATA
);
