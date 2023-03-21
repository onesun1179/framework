import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RouteTree {
  @Field(() => String)
  fullPath: string;

  @Field(() => Int)
  depth: number;
}
