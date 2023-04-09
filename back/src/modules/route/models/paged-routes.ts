import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/paging.output';
import { Route } from '@modules/route/models/route';

@ObjectType('GqlPagedRoutes')
export class PagedRoutes extends PagingOutput(Route) {}
