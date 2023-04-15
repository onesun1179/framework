import { Repository } from 'typeorm';
import { RoleEntity } from '@modules/role/entity';
import { InsertRoleInput, UpdateRoleInput } from '@modules/role/dto';
import { CustomRepository } from '@common/decorator/CustomRepository';

@CustomRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {
  async saveCustom(p: InsertRoleInput | UpdateRoleInput): Promise<RoleEntity> {
    const role = await RoleEntity.create({
      seqNo: p instanceof UpdateRoleInput ? p.seqNo : undefined,
      identifier: p instanceof InsertRoleInput ? p.identifier : undefined,
      roleGroupSeqNo: p.roleGroupSeqNo,
    }).save();

    return role;
  }
}
