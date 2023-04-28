import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseQuery } from "@src/lib/makeUseQuery";
import {
	IconLabelsOutput,
	IconsInput,
	IconsOutput,
	PagingInput,
} from "@gqlType";

export const ICON_SELECT_MODAL_1_QUERY = gql`
	query ICON_SELECT_MODAL_1 {
		iconLabels: iconLabels {
			list {
				seqNo
				name
			}
		}
	}
` as TypedDocumentNode<{
	iconLabels: IconLabelsOutput;
}>;

export const ICON_SELECT_MODAL_2_QUERY = gql`
	query ICON_SELECT_MODAL_2(
		$iconsInput: IconsInput
		$pagingInput: PagingInput
	) {
		icons: icons(iconsInput: $iconsInput, pagingInput: $pagingInput) {
			list {
				seqNo
				name
				fileFullPath
			}
			total
		}
	}
` as TypedDocumentNode<
	{
		icons: IconsOutput;
	},
	{
		iconsInput?: IconsInput;
		pagingInput?: PagingInput;
	}
>;

export const useIconSelectModal1Query = makeUseQuery(ICON_SELECT_MODAL_1_QUERY);
export const useIconSelectModal2Query = makeUseQuery(ICON_SELECT_MODAL_2_QUERY);
