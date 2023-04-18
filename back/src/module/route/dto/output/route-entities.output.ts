import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';

@ObjectType()
export class RouteEntitiesOutput extends PagingOutput(RouteEntity) {}
