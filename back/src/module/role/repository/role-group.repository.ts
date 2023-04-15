import { Repository } from 'typeorm';
import { RoleGroupEntity } from '@modules/role/entity';
import { InsertRoleGroupInput, UpdateRoleGroupInput } from '@modules/role/dto';
import { CustomRepository } from '@common/decorator/CustomRepository';

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
