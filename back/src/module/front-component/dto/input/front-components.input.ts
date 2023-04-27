import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from 'src/common/type';
import { FrontComponentsSearchInput } from '@modules/front-component/dto/input/front-components-search.input';
import { FrontComponentsSortInput } from '@modules/front-component/dto/input/front-components-sort.input';

@InputType()
@ArgsType()
export class FrontComponentsInput {
  @Field(() => FrontComponentsSearchInput, {
    nullable: true,
  })
  @Type(() => FrontComponentsSearchInput)
  search?: Nullable<FrontComponentsSearchInput>;

  @Field(() => FrontComponentsSortInput, {
    nullable: true,
  })
  @Type(() => FrontComponentsSortInput)
  sort?: Nullable<FrontComponentsSortInput>;
}
