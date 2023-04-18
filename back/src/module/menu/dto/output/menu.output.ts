import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Nullable } from '@common/type';

@ObjectType()
export class MenuOutput {
  @Field(() => Int)
  seqNo!: number;
  @Field(() => String)
  name!: string;
  @Field(() => Int, {
    nullable: true,
  })
  iconSeqNo?: Nullable<number>;
  @Field(() => Int, {
    nullable: true,
  })
  routeSeqNo?: Nullable<number>;
  @Field(() => Int)
  menuSeqNo!: number;
  @Field(() => Int, {
    nullable: true,
  })
  parentSeqNo?: Nullable<number>;
}
