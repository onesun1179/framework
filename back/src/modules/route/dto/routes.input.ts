import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class RoutesInput {
  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
  })
  rootYn = false;

  @Field(() => [Int], {
    nullable: true,
  })
  seqNos?: Array<number>;

  @Field(() => String, {
    nullable: true,
  })
  path?: string;

  @Field(() => Int, {
    nullable: true,
  })
  parentSeqNo?: number;
}
