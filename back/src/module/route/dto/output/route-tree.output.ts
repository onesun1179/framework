import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RouteTreeOutput {
  @Field(() => String)
  fullPath!: string;

  @Field(() => Int)
  depth!: number;

  @Field(() => Int)
  childCount!: number;
}
