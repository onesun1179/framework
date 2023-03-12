import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { RoleGroup } from '../RoleGroup';
import { Role } from '../Role';
import { UtilField } from '@util/Util.field';

@InputType({
  description: UtilField.getFieldComment('role', 'group', 'save', 'req'),
})
@ArgsType()
export class SaveRoleGroupRequest
  extends PickType(RoleGroup, ['name', 'parentSeqNo'])
  implements Pick<Partial<RoleGroup>, 'seqNo'>
{
  @Field(() => Int, {
    nullable: true,
    description: UtilField.getFieldComment('role', 'group', 'seqNo'),
  })
  seqNo?: RoleGroup['seqNo'];

  @Field(() => [Int], {
    defaultValue: [],
    nullable: true,
    description: UtilField.getFieldComment('role', 'seqNo', 's'),
  })
  roleSeqNos: Array<Role['seqNo']>;

  @Field(() => [Int], {
    defaultValue: [],
    nullable: true,
    description: UtilField.getFieldComment('child', 'seqNo', 's'),
  })
  childSeqNos: Array<RoleGroup['seqNo']>;
}
