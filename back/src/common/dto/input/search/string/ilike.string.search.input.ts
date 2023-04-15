import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class IlikeStringSearchInput {
  @Field(() => String)
  value!: string;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
  })
  not!: boolean;
}
