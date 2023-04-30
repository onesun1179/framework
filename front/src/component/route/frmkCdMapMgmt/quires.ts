import { gql, TypedDocumentNode } from "@apollo/client";
import { CodesInput, CodesOutput, PagingInput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const FRMK_CD_MAP_MGMT_1_QUERY = gql`
	query FRMK_CD_MAP_MGMT_1($codesInput: CodesInput, $pagingInput: PagingInput) {
		codes(codesInput: $codesInput, pagingInput: $pagingInput) {
			list {
				seqNo
				name
				updatedAt
				createdAt
				desc
				children {
					total
				}
				parents {
					total
				}
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

export const FRMK_CD_MAP_MGMT_2_QUERY = gql`
	query FRMK_CD_MAP_MGMT_2($seqNo: Int!) {
		codes(
			codesInput: { search: { seqNo: { equal: { value: $seqNo, not: true } } } }
		) {
			list {
				seqNo
				name
			}
		}
		childCodes(seqNo: $seqNo) {
			list {
				seqNo
				name
			}
		}
		parentCodes(seqNo: $seqNo) {
			list {
				seqNo
				name
			}
		}
	}
` as TypedDocumentNode<
	{
		codes: CodesOutput;
		childCodes: CodesOutput;
		parentCodes: CodesOutput;
	},
	{
		seqNo: number;
	}
>;

export const useFrmkCdMapMgmt1Query = makeUseQuery(FRMK_CD_MAP_MGMT_1_QUERY);
export const useFrmkCdMapMgmt2Query = makeUseQuery(FRMK_CD_MAP_MGMT_2_QUERY);
