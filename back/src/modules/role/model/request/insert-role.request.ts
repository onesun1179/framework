import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Role } from '../role';
import { User } from '@modules/user/models/user';
import { Menu } from '@modules/menu/model/menu';
import { Route } from '@modules/route/models/route';
import { UtilField } from '@util/Util.field';

@InputType()
export class InsertRoleRequest extends PickType(Role, [
  'name',
  'roleGroupSeqNo',
]) {
  @Field(() => String, {
    description: UtilField.getFieldComment('user', 'seqNo', 's'),
    nullable: true,
  })
  userIds: Array<User['id']>;

  @Field(() => [Int], {
    description: UtilField.getFieldComment('menu', 'seqNo', 's'),
    nullable: true,
  })
  menuSeqNos: Array<Menu['seqNo']>;

  @Field(() => [Int], {
    description: UtilField.getFieldComment('route', 'seqNo', 's'),
    nullable: true,
  })
  routeSeqNos: Array<Route['seqNo']>;
}
