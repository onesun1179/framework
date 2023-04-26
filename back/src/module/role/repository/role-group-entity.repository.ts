import { Repository } from 'typeorm';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { RoleGroupEntity } from '@modules/role/dto/output/entity/role-group.entity';
import { InsertRoleGroupEntityInput } from '@modules/role/dto/input/insert-role-group-entity.input';
import { UpdateRoleGroupEntityInput } from '@modules/role/dto/input/update-role-group-entity.input';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { RoleGroupEntitiesInput } from '@modules/role/dto/input/role-group-entities.input';
import { RoleGroupEntitiesOutput } from '@modules/role/dto/output/role-group-entities.output';

@CustomRepository(RoleGroupEntity)
export class RoleGroupEntityRepository extends Repository<RoleGroupEntity> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    roleGroupEntitiesInput: Nullable<RoleGroupEntitiesInput>,
  ): Promise<RoleGroupEntitiesOutput> {
    const qb = this.createQueryBuilder('rg');

    if (roleGroupEntitiesInput) {
      const { search, sort } = roleGroupEntitiesInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: RoleGroupEntitiesOutput,
    });
  }

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
