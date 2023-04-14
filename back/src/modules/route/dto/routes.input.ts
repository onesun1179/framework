import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from '@common/types';
import { RoutesSearchInput } from '@modules/route/dto/input/search/routes.search.input';
import { RoutesSortInput } from '@modules/route/dto/input/sort/routes.sort.input';

@InputType()
@ArgsType()
export class RoutesInput {
  @Field(() => RoutesSearchInput, {
    nullable: true,
  })
  @Type(() => RoutesSearchInput)
  search?: Nullable<RoutesSearchInput>;

  @Field(() => RoutesSortInput, {
    nullable: true,
  })
  @Type(() => RoutesSortInput)
  sort?: Nullable<RoutesSortInput>;
}
