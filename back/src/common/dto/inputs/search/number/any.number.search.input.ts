import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Nullable } from '@common/types';

@InputType()
@ArgsType()
export class AnyNumberSearchInput {
  @Field(() => [Int], {
    nullable: 'items',
  })
  value!: Array<Nullable<number>>;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
  })
  not!: boolean;
}
