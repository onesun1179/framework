import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { RouteEntity } from '@modules/route/entity';

@ObjectType()
export class RoutesOutput extends PagingOutput(RouteEntity) {}
