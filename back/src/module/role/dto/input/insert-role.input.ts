import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';

@InputType()
export class InsertRoleInput extends PickType(RoleOutput, [
  'name',
  'roleGroupSeqNo',
  'desc',
]) {
  @Field(() => String, {
    nullable: true,
  })
  userIds?: Nullable<Array<UserOutput['id']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  menuSeqNos?: Nullable<Array<MenuEntity['seqNo']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  routeSeqNos?: Nullable<Array<RouteOutput['seqNo']>>;
}
