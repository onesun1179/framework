import { gql } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";

export const FRMK_MSG_MGMT_DATA = gql`
	query FRMK_MSG_MGMT_DATA($paging: PagingInput, $param: MessageEntitiesInput) {
		messageEntities(pagingInput: $paging, messageEntitiesInput: $param) {
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
`;

export const useFrmkMsgMgmtData = makeUseQuery(FRMK_MSG_MGMT_DATA);
