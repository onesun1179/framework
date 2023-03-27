import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export function PagingResponse<T>(classRef: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: true })
    list: typeof classRef[];

    @Field(() => Int, { nullable: true })
    total: number;
  }
  return PaginatedType;
}
