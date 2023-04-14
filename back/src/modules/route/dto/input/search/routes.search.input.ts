import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { NumberSearchInput } from '@common/dto/inputs/search/number.search.input';
import { Nullable } from '@common/types';
import { StringSearchInput } from '@common/dto/inputs/search/string.search.input';
import { Type } from 'class-transformer';

@InputType()
@ArgsType()
export class RoutesSearchInput {
  @Field(() => NumberSearchInput, {
    nullable: true,
  })
  @Type(() => StringSearchInput)
  path?: Nullable<StringSearchInput>;

  @Field(() => StringSearchInput, {
    nullable: true,
  })
  @Type(() => StringSearchInput)
  frontComponentId?: Nullable<StringSearchInput>;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: false,
  })
  rootYn = false;
}
