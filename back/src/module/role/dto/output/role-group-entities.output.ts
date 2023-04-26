import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { RoleGroupEntity } from '@modules/role/dto/output/entity/role-group.entity';

@ObjectType()
export class RoleGroupEntitiesOutput extends PagingOutput(RoleGroupEntity) {}
