import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Nullable } from '@common/type';
import { UsersSearchInput } from '@modules/user/dto/input/search/users.search.input';
import { UsersSortInput } from '@modules/user/dto/input/sort/users.sort.input';

@InputType()
@ArgsType()
export class UsersInput {
  @Field(() => UsersSearchInput, {
    nullable: true,
  })
  @Type(() => UsersSearchInput)
  search?: Nullable<UsersSearchInput>;

  @Field(() => UsersSortInput, {
    nullable: true,
  })
  @Type(() => UsersSortInput)
  sort?: Nullable<UsersSortInput>;
}
