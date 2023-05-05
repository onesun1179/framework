import { Injectable, Logger } from '@nestjs/common';
import { InsertRoleInput } from '@modules/role/dto/input/insert-role.input';
import { UpdateRoleInput } from '@modules/role/dto/input/update-role.input';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RoleGroupRepository } from '@modules/role/repository/role-group.repository';
import { RoleFrontComponentMapRepository } from '@modules/role/repository/role-front-component-map.repository';
import { RoleRouteMapRepository } from '@modules/role/repository/role-route-map.repository';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { RoleGroupsInput } from '@modules/role/dto/input/role-groups.input';
import { RoleGroupsOutput } from '@modules/role/dto/output/role-groups.output';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';
import { InsertRoleGroupInput } from '@modules/role/dto/input/insert-role-group.input';
import { UpdateRoleGroupInput } from '@modules/role/dto/input/update-role-group.input';
import { RoleGroupOutput } from '@modules/role/dto/output/entity/role-group.output';
import { RolesInput } from '@modules/role/dto/input/roles.input';
import { RolesOutput } from '@modules/role/dto/output/roles.output';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

@Injectable()
export class RoleService {
  constructor(
    private roleRepository: RoleRepository,
    private roleGroupRepository: RoleGroupRepository,
    private roleFrontComponentMapRepository: RoleFrontComponentMapRepository,
    private roleRouteMapRepository: RoleRouteMapRepository,
  ) {}
  private readonly logger = new Logger(RoleService.name);

  async roles(
    pagingInput: Nullable<PagingInput>,
    roleEntitiesInput: Nullable<RolesInput>,
    queryBuilder?: SelectQueryBuilder<RoleOutput>,
  ): Promise<RolesOutput> {
    const qb = queryBuilder || this.roleRepository.createQueryBuilder('r');

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

  async roleGroups(
    pagingInput: Nullable<PagingInput>,
    roleGroupsInput: Nullable<RoleGroupsInput>,
    queryBuilder?: SelectQueryBuilder<RoleGroupOutput>,
  ): Promise<RoleGroupsOutput> {
    const qb =
      queryBuilder || this.roleGroupRepository.createQueryBuilder('rg');

    if (roleGroupsInput) {
      const { search, sort } = roleGroupsInput;

      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: RoleGroupsOutput,
    });
  }

  async saveRoleGroupCustom(p: InsertRoleGroupInput | UpdateRoleGroupInput) {
    return this.roleGroupRepository.save(
      RoleGroupOutput.create({
        seqNo: p instanceof UpdateRoleGroupInput ? p.seqNo : undefined,
        name: p.name,
        parentSeqNo: p.parentSeqNo,
      }),
    );
  }

  async saveRoleCustom(
    p: InsertRoleInput | UpdateRoleInput,
  ): Promise<RoleOutput> {
    return await this.roleRepository.save(
      RoleOutput.create({
        seqNo: p instanceof UpdateRoleInput ? p.seqNo : undefined,
        roleGroupSeqNo: p.roleGroupSeqNo,
        name: p.name,
        desc: p.desc,
      }),
    );
  }
}
