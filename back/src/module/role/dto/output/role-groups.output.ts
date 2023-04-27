import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { RoleGroupOutput } from '@modules/role/dto/output/entity/role-group.output';

@ObjectType()
export class RoleGroupsOutput extends PagingOutput(RoleGroupOutput) {}
