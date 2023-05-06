import { gql, TypedDocumentNode } from "@apollo/client";
import { IconOutput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const CUSTOM_ICON_1_QUERY = gql`
	query CUSTOM_ICON_1($iconSeqNo: Int!) {
		icon(seqNo: $iconSeqNo) {
			seqNo
			name
			fileFullPath
		}
	}
` as TypedDocumentNode<
	{
		icon: IconOutput;
	},
	{
		iconSeqNo: number;
	}
>;

export const useCustomIcon1Query = makeUseQuery(CUSTOM_ICON_1_QUERY);
