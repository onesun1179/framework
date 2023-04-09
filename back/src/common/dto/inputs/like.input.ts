import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class LikeInput {
  @Field(() => String, {
    nullable: true,
  })
  value?: string;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
  })
  not?: boolean = false;
}
