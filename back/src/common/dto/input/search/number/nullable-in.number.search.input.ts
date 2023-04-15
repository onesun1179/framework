import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';

@InputType()
@ArgsType()
export class NullableInNumberSearchInput {
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
