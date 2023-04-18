import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleGroupEntity } from '@modules/role/dto/output/entity/role-group.entity';
import { InsertRoleGroupEntityInput } from '@modules/role/dto/input/insert-role-group-entity.input';
import { UpdateRoleGroupEntityInput } from '@modules/role/dto/input/update-role-group-entity.input';

@CustomRepository(RoleGroupEntity)
export class RoleGroupEntityRepository extends Repository<RoleGroupEntity> {
  async saveCustom(
    p: InsertRoleGroupEntityInput | UpdateRoleGroupEntityInput,
  ): Promise<RoleGroupEntity> {
    const roleGroup = await RoleGroupEntity.create({
      seqNo: p instanceof UpdateRoleGroupEntityInput ? p.seqNo : undefined,
      name: p.name,
      parentSeqNo: p.parentSeqNo,
    }).save();

    return roleGroup;
  }
}
