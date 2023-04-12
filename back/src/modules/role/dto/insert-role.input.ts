import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Role } from '../entities/role.entity';
import { User } from '@modules/user/models/user';
import { Menu } from '@modules/menu/model/menu';
import { Route } from '@modules/route/dto/route';
import { Nullable } from '@common/types';

@InputType()
export class InsertRoleInput extends PickType(Role, [
  'name',
  'identifier',
  'roleGroupSeqNo',
]) {
  @Field(() => String, {
    nullable: true,
  })
  userIds?: Nullable<Array<User['id']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  menuSeqNos?: Nullable<Array<Menu['seqNo']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  routeSeqNos?: Nullable<Array<Route['seqNo']>>;
}
