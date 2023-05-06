import { gql, TypedDocumentNode } from "@apollo/client";
import { makeUseMutation } from "@src/lib/makeUseMutation";
import { RoleFrontComponentMapOutput } from "@gqlType";

export const UPDATE_ALL_FRONT_COMPONENT_BY_ROLE_FRONT_COMPONENT_MAP_ENTITY_MUTATION =
	gql`
		mutation UPDATE_ALL_FRONT_COMPONENT_BY_ROLE_FRONT_COMPONENT_MAP_ENTITY(
			$roleSeqNo: Int!
			$frontComponentId: String!
			$allFrontComponentId: String!
		) {
			roleFrontComponentMapEntity: updateAllFrontComponentByRoleFrontComponentMap(
				roleSeqNo: $roleSeqNo
				frontComponentId: $frontComponentId
				allFrontComponentId: $allFrontComponentId
			) {
				allFrontComponentId
			}
		}
	` as TypedDocumentNode<
		{
			roleFrontComponentMapEntity: RoleFrontComponentMapOutput;
		},
		{
			roleSeqNo: number;
			frontComponentId: string;
			allFrontComponentId: string;
		}
	>;

export const useUpdateAllFrontComponentByRoleFrontComponentMapEntityMutation =
	makeUseMutation(
		UPDATE_ALL_FRONT_COMPONENT_BY_ROLE_FRONT_COMPONENT_MAP_ENTITY_MUTATION
	);
