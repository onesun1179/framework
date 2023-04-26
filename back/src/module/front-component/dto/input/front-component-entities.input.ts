import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { FrontComponentEntitiesSearchInput } from '@modules/front-component/dto/input/front-component-entities-search.input';
import { FrontComponentEntitiesSortInput } from '@modules/front-component/dto/input/front-component-entities-sort.input';

@InputType()
@ArgsType()
export class FrontComponentEntitiesInput {
  @Field(() => FrontComponentEntitiesSearchInput, {
    nullable: true,
  })
  @Type(() => FrontComponentEntitiesSearchInput)
  search?: Nullable<FrontComponentEntitiesSearchInput>;

  @Field(() => FrontComponentEntitiesSortInput, {
    nullable: true,
  })
  @Type(() => FrontComponentEntitiesSortInput)
  sort?: Nullable<FrontComponentEntitiesSortInput>;
}
