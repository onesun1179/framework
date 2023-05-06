import { gql } from "@apollo/client";

const t = gql`
	query {
		routes {
			list {
				seqNo
			}
		}
	}
`;
