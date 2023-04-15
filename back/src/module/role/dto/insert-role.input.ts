import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { RoleEntity } from '@modules/role/entity';
import { UserEntity } from '@modules/user/entity';
import { MenuEntity } from '@modules/menu/entity';
import { RouteEntity } from '@modules/route/entity';
import { Nullable } from 'src/common/type';

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
