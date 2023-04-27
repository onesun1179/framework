import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleGroupOutput } from '@modules/role/dto/output/entity/role-group.output';
import { InsertRoleGroupInput } from '@modules/role/dto/input/insert-role-group.input';
import { UpdateRoleGroupInput } from '@modules/role/dto/input/update-role-group.input';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { RoleGroupsInput } from '@modules/role/dto/input/role-groups.input';
import { RoleGroupsOutput } from '@modules/role/dto/output/role-groups.output';

@CustomRepository(RoleGroupOutput)
export class RoleGroupRepository extends Repository<RoleGroupOutput> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    roleGroupEntitiesInput: Nullable<RoleGroupsInput>,
  ): Promise<RoleGroupsOutput> {
    const qb = this.createQueryBuilder('rg');

    if (roleGroupEntitiesInput) {
      const { search, sort } = roleGroupEntitiesInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: RoleGroupsOutput,
    });
  }

  async saveCustom(
    p: InsertRoleGroupInput | UpdateRoleGroupInput,
  ): Promise<RoleGroupOutput> {
    const roleGroup = await RoleGroupOutput.create({
      seqNo: p instanceof UpdateRoleGroupInput ? p.seqNo : undefined,
      name: p.name,
      parentSeqNo: p.parentSeqNo,
    }).save();

    return roleGroup;
  }
}
