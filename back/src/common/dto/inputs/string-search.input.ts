import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { RegexInput } from '@common/dto/inputs/regex.input';
import { LikeInput } from '@common/dto/inputs/like.input';

@InputType()
@ArgsType()
export class StringSearchInput {
  @Field(() => RegexInput, {
    nullable: true,
  })
  regex?: RegexInput;

  @Field(() => LikeInput, {
    nullable: true,
  })
  like?: LikeInput;
}
