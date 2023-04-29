import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import { MessageGroupsInput, MessageGroupsOutput, PagingInput } from "@gqlType";

export const FRMK_MSG_GRK_MGMT_DATA_QUERY = gql`
	query FRMK_MSG_GRK_MGMT_DATA(
		$paging: PagingInput
		$param: MessageGroupsInput
	) {
		messageGroups(pagingInput: $paging, messageGroupsInput: $param) {
			list {
				name
				code
				desc
				createdAt
				updatedAt
			}
			total
		}
	}
` as TypedDocumentNode<
	{
		messageGroups: MessageGroupsOutput;
	},
	{
		paging: PagingInput;
		param: MessageGroupsInput;
	}
>;

export const useFrmkMsgGrkMgmtDataQuery = makeUseQuery(
	FRMK_MSG_GRK_MGMT_DATA_QUERY
);
