import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleGroupEntity } from '@modules/role/entity/role-group.entity';
import { InsertRoleGroupInput } from '@modules/role/dto/insert-role-group.input';
import { UpdateRoleGroupInput } from '@modules/role/dto/update-role-group.input';

@CustomRepository(RoleGroupEntity)
export class RoleGroupRepository extends Repository<RoleGroupEntity> {
  async saveCustom(
    p: InsertRoleGroupInput | UpdateRoleGroupInput,
  ): Promise<RoleGroupEntity> {
    const roleGroup = await RoleGroupEntity.create({
      seqNo: p instanceof UpdateRoleGroupInput ? p.seqNo : undefined,
      name: p.name,
      parentSeqNo: p.parentSeqNo,
    }).save();

    return roleGroup;
  }
}
