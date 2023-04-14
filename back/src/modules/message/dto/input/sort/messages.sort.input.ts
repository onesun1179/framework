import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { SortEnum } from '@common/enums/sort.enum';
import { Nullable } from '@common/types';

@InputType()
@ArgsType()
export class MessagesSortInput {
  @Field(() => SortEnum, {
    nullable: true,
  })
  seqNo?: Nullable<SortEnum>;

  @Field(() => SortEnum, {
    nullable: true,
  })
  code?: Nullable<SortEnum>;

  @Field(() => SortEnum, {
    nullable: true,
  })
  name?: Nullable<SortEnum>;

  @Field(() => SortEnum, {
    nullable: true,
  })
  text?: Nullable<SortEnum>;

  @Field(() => SortEnum, {
    nullable: true,
  })
  groupCode?: Nullable<SortEnum>;
}
