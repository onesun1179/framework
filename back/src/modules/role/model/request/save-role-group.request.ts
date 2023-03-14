import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { RoleGroup } from '../role-group';
import { Role } from '../role';

@InputType()
@ArgsType()
export class SaveRoleGroupRequest
  extends PickType(RoleGroup, ['name', 'parentSeqNo'])
  implements Pick<Partial<RoleGroup>, 'seqNo'>
{
  @Field(() => Int, {
    nullable: true,
  })
  seqNo?: RoleGroup['seqNo'];

  @Field(() => [Int], {
    defaultValue: [],
    nullable: true,
  })
  roleSeqNos: Array<Role['seqNo']>;

  @Field(() => [Int], {
    defaultValue: [],
    nullable: true,
  })
  childSeqNos: Array<RoleGroup['seqNo']>;
}
