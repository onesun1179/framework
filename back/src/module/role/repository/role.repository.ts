import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleEntity } from '@modules/role/entity/role.entity';
import { InsertRoleInput } from '@modules/role/dto/insert-role.input';
import { UpdateRoleInput } from '@modules/role/dto/update-role.input';

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
