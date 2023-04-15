import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from '@common/type';
import { MenusSearchInput, MenusSortInput } from '@modules/menu/dto';

@InputType()
@ArgsType()
export class MenusInput {
  @Field(() => MenusSearchInput, {
    nullable: true,
  })
  @Type(() => MenusSearchInput)
  search?: Nullable<MenusSearchInput>;

  @Field(() => MenusSortInput, {
    nullable: true,
  })
  @Type(() => MenusSortInput)
  sort?: Nullable<MenusSortInput>;
}
