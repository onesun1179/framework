import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from '@common/types';

@InputType()
@ArgsType()
export class InStringSearchInput {
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
