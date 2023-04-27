import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';

@ObjectType()
export class RolesOutput extends PagingOutput(RoleOutput) {}
