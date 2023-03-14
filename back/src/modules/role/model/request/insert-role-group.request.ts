import { ArgsType, Field, InputType, Int, PickType } from '@nestjs/graphql';
import { RoleGroup } from '../role-group';
import { Role } from '../role';

@InputType()
@ArgsType()
export class InsertRoleGroupRequest extends PickType(RoleGroup, [
  'name',
  'parentSeqNo',
]) {
  @Field(() => [Int], {
    nullable: true,
    defaultValue: [],
  })
  roleSeqNos: Array<Role['seqNo']>;

  @Field(() => [Int], {
    nullable: true,
    defaultValue: [],
  })
  childSeqNos: Array<RoleGroup['seqNo']>;

  async toRoleGroup(): Promise<RoleGroup> {
    return RoleGroup.create({
      name: this.name,
      roles: await Role.find({
        where:
          this.roleSeqNos.length > 0
            ? this.roleSeqNos.map((seqNo) => ({
                seqNo,
              }))
            : [],
      }),
      children:
        this.childSeqNos.length > 0
          ? await RoleGroup.find({
              where: this.childSeqNos.map((seqNo) => ({
                seqNo,
              })),
            })
          : [],

      parent:
        typeof this.parentSeqNo === 'number'
          ? await RoleGroup.findOne({
              where: {
                seqNo: this.parentSeqNo,
              },
            })
          : null,
    });
  }
}
