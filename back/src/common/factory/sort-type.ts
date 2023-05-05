import { MappedType, Nullable } from '@common/type';
import { Field, InputType } from '@nestjs/graphql';
import { SortTypeInput } from '@common/dto/input/sort-type.input';

@InputType({ isAbstract: true })
export class SortClassType {}

export function SortType<T extends string>(
  arr: Array<T>,
): MappedType<Record<T, Nullable<SortTypeInput> | undefined>> {
  arr.forEach((key) => {
    Reflect.decorate(
      [
        Field(() => SortTypeInput, {
          nullable: true,
        }),
      ],
      SortClassType.prototype,
      key,
    );
  });
  return SortClassType as MappedType<
    Record<T, Nullable<SortTypeInput> | undefined>
  >;
}
