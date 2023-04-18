import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { UserEntity } from '@modules/user/entity/user.entity';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';

@InputType()
export class InsertRoleEntityInput extends PickType(RoleEntity, [
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
