import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import { CodesInput, CodesOutput, PagingInput } from "@gqlType";

export const FRMK_CD_MGMT_1_QUERY = gql`
	query FRMK_CD_MGMT_1($codesInput: CodesInput, $pagingInput: PagingInput) {
		codes(codesInput: $codesInput, pagingInput: $pagingInput) {
			list {
				seqNo
				name
				updatedAt
				createdAt
				desc
			}
			total
		}
	}
` as TypedDocumentNode<
	{
		codes: CodesOutput;
	},
	{
		codesInput: CodesInput;
		pagingInput: PagingInput;
	}
>;

export const useFrmkCdMgmt1Query = makeUseQuery(FRMK_CD_MGMT_1_QUERY);
