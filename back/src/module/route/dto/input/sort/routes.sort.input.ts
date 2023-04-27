import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { SortEnum } from '@common/enum/sort.enum';
import { Nullable } from 'src/common/type';

@InputType()
@ArgsType()
export class RoutesSortInput {
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
