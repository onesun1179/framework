import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Nullable } from '@common/types';

@InputType()
@ArgsType()
export class AnyStringSearchInput {
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
