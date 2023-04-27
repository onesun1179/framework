import { ObjectType } from '@nestjs/graphql';
import { PagingOutput } from '@common/dto/output/paging.output';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';

@ObjectType()
export class RoutesOutput extends PagingOutput(RouteOutput) {}
