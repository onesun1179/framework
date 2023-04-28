import { gql, TypedDocumentNode } from "@apollo/client";
import { ChkUniqMessageByCodeInput } from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const CHECK_UNIQUE = gql`
	query CHECK_UNIQUE($input: ChkUniqMessageByCodeInput!) {
		chkUniqMessageByCode(input: $input)
	}
` as TypedDocumentNode<
	{
		chkUniqMessageByCode: boolean;
	},
	{
		input: ChkUniqMessageByCodeInput;
	}
>;

export const useCheckUnique = makeUseQuery(CHECK_UNIQUE);
