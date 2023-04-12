import { Repository } from 'typeorm';
import { RoleGroup } from '@modules/role/entities/role-group.entity';
import { InsertRoleGroupInput } from '@modules/role/dto/insert-role-group.input';
import { UpdateRoleGroupInput } from '@modules/role/dto/update-role-group.input';
import { CustomRepository } from '@common/docorator/CustomRepository';

@CustomRepository(RoleGroup)
export class RoleGroupRepository extends Repository<RoleGroup> {
  async saveCustom(
    p: InsertRoleGroupInput | UpdateRoleGroupInput,
  ): Promise<RoleGroup> {
    const roleGroup = await RoleGroup.create({
      seqNo: p instanceof UpdateRoleGroupInput ? p.seqNo : undefined,
      name: p.name,
      parentSeqNo: p.parentSeqNo,
    }).save();

    return roleGroup;
  }
}
