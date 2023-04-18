import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Nullable } from '@common/type';

@ObjectType()
export class RouteOutput {
  @Field(() => Int)
  seqNo!: number;
  @Field()
  path!: string;
  @Field(() => String, {
    nullable: true,
  })
  frontComponentId?: Nullable<string>;
  @Field(() => Int, {
    nullable: true,
  })
  parentSeqNo?: Nullable<number>;
}
