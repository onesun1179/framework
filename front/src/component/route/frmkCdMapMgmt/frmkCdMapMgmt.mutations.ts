import { gql, TypedDocumentNode } from "@apollo/client";
import { CodeOutput } from "@gqlType";
import { makeUseMutation } from "@src/lib/makeUseMutation";

export const UPDATE_CODE_CHILDREN_MUTATION = gql`
	mutation UPDATE_CODE_CHILDREN(
		$parentCodeSeqNos: [Int!]
		$childCodeSeqNos: [Int!]
		$seqNo: Int!
	) {
		code: updateCode(
			updateCodeInput: {
				childCodeSeqNos: $childCodeSeqNos
				parentCodeSeqNos: $parentCodeSeqNos
				seqNo: $seqNo
			}
		) {
			seqNo
		}
	}
` as TypedDocumentNode<
	{
		code: CodeOutput;
	},
	| {
			childCodeSeqNos: Array<number>;
			seqNo: number;
	  }
	| {
			parentCodeSeqNos: Array<number>;
			seqNo: number;
	  }
>;

export const useUpdateCodeChildrenMutation = makeUseMutation(
	UPDATE_CODE_CHILDREN_MUTATION
);
