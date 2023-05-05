import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleGroupOutput } from '@modules/role/dto/output/entity/role-group.output';
import { InsertRoleGroupInput } from '@modules/role/dto/input/insert-role-group.input';
import { UpdateRoleGroupInput } from '@modules/role/dto/input/update-role-group.input';

@CustomRepository(RoleGroupOutput)
export class RoleGroupRepository extends Repository<RoleGroupOutput> {
  async saveCustom(
    p: InsertRoleGroupInput | UpdateRoleGroupInput,
  ): Promise<RoleGroupOutput> {
    return await this.save(
      RoleGroupOutput.create({
        seqNo: p instanceof UpdateRoleGroupInput ? p.seqNo : undefined,
        name: p.name,
        parentSeqNo: p.parentSeqNo,
      }),
    );
  }
}
