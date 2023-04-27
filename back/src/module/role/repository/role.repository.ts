import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { InsertRoleInput } from '@modules/role/dto/input/insert-role.input';
import { UpdateRoleInput } from '@modules/role/dto/input/update-role.input';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { RolesInput } from '@modules/role/dto/input/roles.input';
import { RolesOutput } from '@modules/role/dto/output/roles.output';

@CustomRepository(RoleOutput)
export class RoleRepository extends Repository<RoleOutput> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    roleEntitiesInput: Nullable<RolesInput>,
  ): Promise<RolesOutput> {
    const qb = this.createQueryBuilder('r');

    if (roleEntitiesInput) {
      const { search, sort } = roleEntitiesInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: RolesOutput,
    });
  }

  async saveCustom(p: InsertRoleInput | UpdateRoleInput): Promise<RoleOutput> {
    const role = await RoleOutput.create({
      seqNo: p instanceof UpdateRoleInput ? p.seqNo : undefined,
      identifier: p instanceof InsertRoleInput ? p.identifier : undefined,
      roleGroupSeqNo: p.roleGroupSeqNo,
    }).save();

    return role;
  }
}
