import { MappedType, Nullable } from '@common/type';
import { Field, InputType } from '@nestjs/graphql';
import { SortEnum } from '@common/enum/sort.enum';

export function SortType<T extends string>(
  arr: Array<T>,
): MappedType<Record<T, Nullable<SortEnum> | undefined>> {
  @InputType({ isAbstract: true })
  class SortClassType {}

  arr.forEach((key) => {
    Reflect.decorate(
      [
        Field(() => SortEnum, {
          nullable: true,
        }),
      ],
      SortClassType.prototype,
      key,
    );
  });
  return SortClassType as MappedType<Record<T, Nullable<SortEnum> | undefined>>;
}
