import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { RoutesSearchInput, RoutesSortInput } from '@modules/route/dto';

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
