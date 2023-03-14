import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Role } from '../role';
import { User } from '@modules/user/models/user';
import { Menu } from '@modules/menu/model/menu';
import { Route } from '@modules/route/models/route';

@InputType()
export class InsertRoleRequest extends PickType(Role, [
  'name',
  'roleGroupSeqNo',
]) {
  @Field(() => String, {
    nullable: true,
  })
  userIds: Array<User['id']>;

  @Field(() => [Int], {
    nullable: true,
  })
  menuSeqNos: Array<Menu['seqNo']>;

  @Field(() => [Int], {
    nullable: true,
  })
  routeSeqNos: Array<Route['seqNo']>;
}
