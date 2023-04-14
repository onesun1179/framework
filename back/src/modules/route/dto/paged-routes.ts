import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/outputs/paging.output';
import { Route } from '@modules/route/dto/route';

@ObjectType('GqlPagedRoutes')
export class PagedRoutes extends PagingOutput(Route) {}
