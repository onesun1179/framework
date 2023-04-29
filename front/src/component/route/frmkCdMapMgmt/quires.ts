import { gql, TypedDocumentNode } from "@apollo/client";
import { CodeOutput, CodesOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const FRMK_CD_MAP_MGMT_1_QUERY = gql`
	query FRMK_CD_MAP_MGMT_1 {
		codes {
			list {
				seqNo
				name
			}
			total
		}
	}
` as TypedDocumentNode<{
	codes: CodesOutput;
}>;

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
			seqNo
			name
		}
	}
` as TypedDocumentNode<
	{
		codes: CodesOutput;
		childCodes: Array<CodeOutput>;
	},
	{
		seqNo: number;
	}
>;

export const useFrmkCdMapMgmt1Query = makeUseQuery(FRMK_CD_MAP_MGMT_1_QUERY);
export const useFrmkCdMapMgmt2Query = makeUseQuery(FRMK_CD_MAP_MGMT_2_QUERY);
