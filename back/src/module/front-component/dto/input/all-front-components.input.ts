import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { AllFrontComponentsSearchInput } from '@modules/front-component/dto/input/all-front-components-search.input';
import { AllFrontComponentsSortInput } from '@modules/front-component/dto/input/all-front-components-sort.input';

@InputType()
@ArgsType()
export class AllFrontComponentsInput {
  @Field(() => AllFrontComponentsSearchInput, {
    nullable: true,
  })
  @Type(() => AllFrontComponentsSearchInput)
  search?: Nullable<AllFrontComponentsSearchInput>;

  @Field(() => AllFrontComponentsSortInput, {
    nullable: true,
  })
  @Type(() => AllFrontComponentsSortInput)
  sort?: Nullable<AllFrontComponentsSortInput>;
}
