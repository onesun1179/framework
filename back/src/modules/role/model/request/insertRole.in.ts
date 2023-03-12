import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Role } from '../Role';
import { User } from '../../../user/models/User';
import { Menu } from '../../../menu/model/Menu';
import { Route } from 'src/modules/route/models/Route';
import { UtilField } from '@util/Util.field';

@InputType()
export class InsertRoleIn extends PickType(Role, ['name', 'roleGroupSeqNo']) {
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
