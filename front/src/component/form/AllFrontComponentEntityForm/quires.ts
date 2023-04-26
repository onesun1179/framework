import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import { ChkUniqByAllFcIdInput } from "@gqlType";

export const CHK_UNIQ_BY_ALL_FC_ID = gql`
	query CHK_UNIQ_BY_ALL_FC_ID($input: ChkUniqByAllFcIdInput!) {
		chkUniqByAllFcId(input: $input)
	}
` as TypedDocumentNode<
	{
		chkUniqByAllFcId: boolean;
	},
	{
		input: ChkUniqByAllFcIdInput;
	}
>;

export const useChkUniqByAllFcId = makeUseQuery(CHK_UNIQ_BY_ALL_FC_ID);
