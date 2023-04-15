import { Type } from '@nestjs/common';
import { NonNullableStringSearchInput } from '@common/dto/input/search/non-nullable-string.search.input';
import { NullableStringSearchInput } from '@common/dto/input/search/nullable-string.search.input';
import { NonNullableNumberSearchInput } from '@common/dto/input/search/non-nullable-number.search.input';
import { NullableNumberSearchInput } from '@common/dto/input/search/nullable-number.search.input';
import { MappedType, Nullable } from '@common/type';
import { Field, InputType } from '@nestjs/graphql';
import { entries } from 'lodash';
import { Type as TransformType } from 'class-transformer';

export function SearchType<
  T extends Record<
    string,
    Type<
      | NonNullableStringSearchInput
      | NullableStringSearchInput
      | NonNullableNumberSearchInput
      | NullableNumberSearchInput
    >
  >,
>(
  obj: T,
): MappedType<{
  [A in keyof T]: Nullable<T[A]> | undefined;
}> {
  @InputType({ isAbstract: true })
  class SearchClassType {}

  entries(obj).forEach(([k, v]) => {
    Reflect.decorate(
      [
        Field(() => v, {
          nullable: true,
        }),
        TransformType(() => v),
      ],
      SearchClassType.prototype,
      k,
    );
  });
  return SearchClassType as MappedType<{
    [A in keyof T]: Nullable<T[A]> | undefined;
  }>;
}
