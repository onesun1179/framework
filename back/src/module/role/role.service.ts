import { Injectable, Logger } from '@nestjs/common';
import { InsertRoleInput } from '@modules/role/dto/input/insert-role.input';
import { UpdateRoleInput } from '@modules/role/dto/input/update-role.input';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RoleGroupRepository } from '@modules/role/repository/role-group.repository';
import { RoleFrontComponentMapRepository } from '@modules/role/repository/role-front-component-map.repository';
import { RoleRouteMapRepository } from '@modules/role/repository/role-route-map.repository';

@Injectable()
export class RoleService {
  constructor(
    private roleRepository: RoleRepository,
    private roleGroupRepository: RoleGroupRepository,
    private roleFrontComponentMapRepository: RoleFrontComponentMapRepository,
    private roleRouteMapRepository: RoleRouteMapRepository,
  ) {}
  private readonly logger = new Logger(RoleService.name);

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
