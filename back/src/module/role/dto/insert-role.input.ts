import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { RoleEntity } from '@modules/role/entity/role.entity';
import { UserEntity } from '@modules/user/entity/user.entity';
import { MenuEntity } from '@modules/menu/entity/menu.entity';
import { RouteEntity } from '@modules/route/entity/route.entity';

@InputType()
export class InsertRoleInput extends PickType(RoleEntity, [
  'name',
  'identifier',
  'roleGroupSeqNo',
]) {
  @Field(() => String, {
    nullable: true,
  })
  userIds?: Nullable<Array<UserEntity['id']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  menuSeqNos?: Nullable<Array<MenuEntity['seqNo']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  routeSeqNos?: Nullable<Array<RouteEntity['seqNo']>>;
}
