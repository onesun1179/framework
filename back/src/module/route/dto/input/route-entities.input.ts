import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { RouteEntitiesSearchInput } from '@modules/route/dto/input/search/route-entities.search.input';
import { RouteEntitiesSortInput } from '@modules/route/dto/input/sort/route-entities.sort.input';

@InputType()
@ArgsType()
export class RouteEntitiesInput {
  @Field(() => RouteEntitiesSearchInput, {
    nullable: true,
  })
  @Type(() => RouteEntitiesSearchInput)
  search?: Nullable<RouteEntitiesSearchInput>;

  @Field(() => RouteEntitiesSortInput, {
    nullable: true,
  })
  @Type(() => RouteEntitiesSortInput)
  sort?: Nullable<RouteEntitiesSortInput>;
}
