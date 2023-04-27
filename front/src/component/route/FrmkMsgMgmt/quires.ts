import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import { MessagesInput, MessagesOutput, PagingInput } from "@gqlType";

export const FRMK_MSG_MGMT_DATA = gql`
	query FRMK_MSG_MGMT_DATA($paging: PagingInput, $param: MessagesInput) {
		messages(pagingInput: $paging, messagesInput: $param) {
			list {
				seqNo
				name
				text
				code
				groupCode
				createdAt
				updatedAt
				desc
			}
			total
		}
	}
` as TypedDocumentNode<
	{
		messages: MessagesOutput;
	},
	{
		paging: PagingInput;
		param: MessagesInput;
	}
>;

export const useFrmkMsgMgmtData = makeUseQuery(FRMK_MSG_MGMT_DATA);
