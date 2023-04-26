import { gql, TypedDocumentNode } from "@apollo/client";
import {
	MessageGroupEntitiesInput,
	MessageGroupEntitiesOutput,
	PagingInput,
} from "@gqlType";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const FRMK_MSG_GRK_MGMT_DATA = gql`
	query FRMK_MSG_GRK_MGMT_DATA(
		$paging: PagingInput
		$param: MessageGroupEntitiesInput
	) {
		messageGroupEntities(
			pagingInput: $paging
			messageGroupEntitiesInput: $param
		) {
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
		messageGroupEntities: MessageGroupEntitiesOutput;
	},
	{
		paging: PagingInput;
		param: MessageGroupEntitiesInput;
	}
>;

export const useFrmkMsgGrkMgmtData = makeUseQuery(FRMK_MSG_GRK_MGMT_DATA);
