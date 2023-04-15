import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function PagingOutput<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    list!: typeof classRef[];

    @Field(() => Int)
    total!: number;
  }

  return PaginatedType;
}
