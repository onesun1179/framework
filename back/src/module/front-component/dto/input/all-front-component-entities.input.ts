import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { AllFrontComponentEntitiesSearchInput } from '@modules/front-component/dto/input/all-front-component-entities-search.input';
import { AllFrontComponentEntitiesSortInput } from '@modules/front-component/dto/input/all-front-component-entities-sort.input';

@InputType()
@ArgsType()
export class AllFrontComponentEntitiesInput {
  @Field(() => AllFrontComponentEntitiesSearchInput, {
    nullable: true,
  })
  @Type(() => AllFrontComponentEntitiesSearchInput)
  search?: Nullable<AllFrontComponentEntitiesSearchInput>;

  @Field(() => AllFrontComponentEntitiesSortInput, {
    nullable: true,
  })
  @Type(() => AllFrontComponentEntitiesSortInput)
  sort?: Nullable<AllFrontComponentEntitiesSortInput>;
}
