import { Repository } from 'typeorm';
import { Role } from '@modules/role/entities/role.entity';
import { InsertRoleInput } from '@modules/role/dto/insert-role.input';
import { UpdateRoleInput } from '@modules/role/dto/update-role.input';
import { CustomRepository } from '@common/docorator/CustomRepository';

@CustomRepository(Role)
export class RoleRepository extends Repository<Role> {
  async saveCustom(p: InsertRoleInput | UpdateRoleInput): Promise<Role> {
    const role = await Role.create({
      seqNo: p instanceof UpdateRoleInput ? p.seqNo : undefined,
      identifier: p instanceof InsertRoleInput ? p.identifier : undefined,
      roleGroupSeqNo: p.roleGroupSeqNo,
    }).save();

    return role;
  }
}
