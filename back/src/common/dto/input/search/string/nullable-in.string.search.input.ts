import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';

@InputType()
@ArgsType()
export class NullableInStringSearchInput {
  @Field(() => [String], {
    nullable: 'items',
  })
  value!: Array<Nullable<string>>;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
  })
  not!: boolean;
}
