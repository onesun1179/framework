import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Nullable } from 'src/common/type';
import { RoleGroupEntity } from '@modules/role/entity/role-group.entity';
import { RoleEntity } from '@modules/role/entity/role.entity';

@InputType()
@ArgsType()
export class InsertRoleGroupInput extends PickType(RoleGroupEntity, [
  'name',
  'parentSeqNo',
]) {
  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos?: Nullable<Array<RoleEntity['seqNo']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  childSeqNos?: Nullable<Array<RoleGroupEntity['seqNo']>>;
}
