import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IconOutput {
  @Field(() => Int)
  seqNo!: number;
  @Field(() => String)
  name!: string;
  filePath!: string;
}
