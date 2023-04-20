import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { SortEnum } from '@common/enum/sort.enum';

@InputType()
@ArgsType()
export class SortTypeInput {
  @Field(() => SortEnum)
  sort!: SortEnum;

  @Field(() => Int)
  order!: number;
}
