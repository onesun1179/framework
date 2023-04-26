import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { InsertRoleEntityInput } from '@modules/role/dto/input/insert-role-entity.input';
import { UpdateRoleEntityInput } from '@modules/role/dto/input/update-role-entity.input';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { RoleEntitiesInput } from '@modules/role/dto/input/role-entities.input';
import { RoleEntitiesOutput } from '@modules/role/dto/output/role-entities.output';

@CustomRepository(RoleEntity)
export class RoleEntityRepository extends Repository<RoleEntity> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    roleEntitiesInput: Nullable<RoleEntitiesInput>,
  ): Promise<RoleEntitiesOutput> {
    const qb = this.createQueryBuilder('r');

    if (roleEntitiesInput) {
      const { search, sort } = roleEntitiesInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: RoleEntitiesOutput,
    });
  }

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
