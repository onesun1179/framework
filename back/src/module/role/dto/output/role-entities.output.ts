import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';

@ObjectType()
export class RoleEntitiesOutput extends PagingOutput(RoleEntity) {}
