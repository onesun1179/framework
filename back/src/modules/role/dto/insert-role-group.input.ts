import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { RoleGroup } from '../entities/role-group.entity';
import { Role } from '../entities/role.entity';
import { Nullable } from '@common/types';

@InputType()
@ArgsType()
export class InsertRoleGroupInput extends PickType(RoleGroup, [
  'name',
  'parentSeqNo',
]) {
  @Field(() => [Int], {
    nullable: true,
  })
  roleSeqNos?: Nullable<Array<Role['seqNo']>>;

  @Field(() => [Int], {
    nullable: true,
  })
  childSeqNos?: Nullable<Array<RoleGroup['seqNo']>>;
}
