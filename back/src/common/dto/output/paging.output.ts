import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function PagingOutput(classRef: Type): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    list!: typeof classRef[];

    @Field(() => Int)
    total!: number;
  }

  return PaginatedType;
}
