import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { InsertRoleEntityInput } from '@modules/role/dto/input/insert-role-entity.input';
import { UpdateRoleEntityInput } from '@modules/role/dto/input/update-role-entity.input';

@CustomRepository(RoleEntity)
export class RoleEntityRepository extends Repository<RoleEntity> {
  async saveCustom(
    p: InsertRoleEntityInput | UpdateRoleEntityInput,
  ): Promise<RoleEntity> {
    const role = await RoleEntity.create({
      seqNo: p instanceof UpdateRoleEntityInput ? p.seqNo : undefined,
      identifier: p instanceof InsertRoleEntityInput ? p.identifier : undefined,
      roleGroupSeqNo: p.roleGroupSeqNo,
    }).save();

    return role;
  }
}
