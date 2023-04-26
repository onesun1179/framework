import { gql, TypedDocumentNode } from "@apollo/client";
import {
	FrontComponentEntitiesInput,
	FrontComponentEntitiesOutput,
	PagingInput,
} from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const FRMK_FRNT_CMPNT_MGMT_DATA = gql`
	query FRMK_FRNT_CMPNT_MGMT_DATA(
		$paging: PagingInput
		$param: FrontComponentEntitiesInput
	) {
		frontComponentEntities(
			pagingInput: $paging
			frontComponentEntitiesInput: $param
		) {
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
		frontComponentEntities: FrontComponentEntitiesOutput;
	},
	{
		paging: PagingInput;
		param: FrontComponentEntitiesInput;
	}
>;

export const useFrmkFrntCmpntMgmtData = makeUseQuery(FRMK_FRNT_CMPNT_MGMT_DATA);
