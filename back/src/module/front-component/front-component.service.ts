import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, In } from 'typeorm';
import {
  AllFrontComponentEntity,
  FrontComponentEntity,
} from '@modules/front-component/entity';
import { difference, isNil } from 'lodash';
import { RoleFrontComponentMapEntity } from '@modules/role/entity';
import { RouteEntity } from '@modules/route/entity';
import { RouteService } from '@modules/route';
import {
  AllFrontComponentRepository,
  FrontComponentRepository,
} from '@modules/front-component/repository';
import {
  InsertAllFrontComponentInput,
  InsertFrontComponentInput,
  UpdateAllFrontComponentInput,
  UpdateFrontComponentInput,
} from '@modules/front-component/dto/input';

@Injectable()
export class FrontComponentService {
  constructor(
    private routeService: RouteService,
    private dataSource: DataSource,
    private frontComponentRepository: FrontComponentRepository,
    private allFrontComponentRepository: AllFrontComponentRepository,
  ) {}

  async saveAllFrontComponent(
    p: InsertAllFrontComponentInput | UpdateAllFrontComponentInput,
  ): Promise<AllFrontComponentEntity> {
    return this.dataSource.manager.transaction(async (entityManager) => {
      return await entityManager.save(
        AllFrontComponentEntity.create({
          id: p.id,
          frontComponentId: p.frontComponentId,
        }),
      );
    });
  }

  async saveFrontComponent(
    p: InsertFrontComponentInput | UpdateFrontComponentInput,
  ): Promise<FrontComponentEntity> {
    return this.dataSource.manager.transaction(async (entityManager) => {
      if (p.routeSeqNos) {
        await this.routeService.updateFrontComponentByRoute(
          entityManager,
          p.routeSeqNos,
          p.id,
        );
      }
      if (p.allFrontComponentIds) {
        await this.updateFrontComponentByAllFrontComponent(
          entityManager,
          p.allFrontComponentIds,
          p.id,
        );
      }

      const frontComponent = await entityManager.save(
        FrontComponentEntity.create({
          id: p.id,
        }),
      );

      if (!isNil(p.roleSeqNos)) {
        await this.saveRoleSeqNosToFrontComponent(
          entityManager,
          frontComponent.id,
          p.roleSeqNos,
        );
      }

      if (!isNil(p.routeSeqNos)) {
        await this.saveRouteSeqNosToFrontComponent(
          entityManager,
          frontComponent.id,
          p.routeSeqNos,
        );
      }

      return frontComponent;
    });
  }

  async saveRoleSeqNosToFrontComponent(
    entityManager: EntityManager,
    frontComponentId: string,
    roleSeqNos: Array<number>,
  ) {
    const foundRoleSeqNos = await entityManager
      .find(RoleFrontComponentMapEntity, {
        select: ['roleSeqNo'],
        where: {
          frontComponentId,
        },
      })
      .then((r) => r?.map((o) => o.roleSeqNo));

    const willDeleteRoleSeqNos = difference(foundRoleSeqNos, roleSeqNos);

    const willSaveRoleSeqNos = difference(roleSeqNos, willDeleteRoleSeqNos);

    if (willDeleteRoleSeqNos.length > 0) {
      await entityManager.delete(RoleFrontComponentMapEntity, {
        roleSeqNo: In(willDeleteRoleSeqNos),
      });
    }

    if (willSaveRoleSeqNos.length > 0) {
      await entityManager.save(
        willSaveRoleSeqNos.map((o) =>
          RoleFrontComponentMapEntity.create({
            roleSeqNo: o,
            frontComponentId,
          }),
        ),
      );
    }
  }

  async saveRouteSeqNosToFrontComponent(
    entityManager: EntityManager,
    frontComponentId: string,
    routeSeqNos: Array<number>,
  ) {
    const foundRouteSeqNos = await entityManager
      .find(RouteEntity, {
        select: ['seqNo'],
        where: {
          frontComponentId,
        },
      })
      .then((r) => r?.map((o) => o.seqNo));

    const willDeleteRouteSeqNos = difference(foundRouteSeqNos, routeSeqNos);

    const willSaveRouteSeqNos = difference(routeSeqNos, willDeleteRouteSeqNos);

    if (willDeleteRouteSeqNos.length > 0) {
      await entityManager.update(
        RouteEntity,
        {
          seqNo: In(willDeleteRouteSeqNos),
        },
        {
          frontComponentId: null,
        },
      );
    }

    if (willSaveRouteSeqNos.length > 0) {
      await entityManager.update(
        RouteEntity,
        {
          seqNo: In(willSaveRouteSeqNos),
        },
        {
          frontComponentId,
        },
      );
    }
  }

  async updateFrontComponentByAllFrontComponent(
    entityManager: EntityManager,
    allFrontComponentIds: Array<AllFrontComponentEntity['id']>,
    frontComponentId: FrontComponentEntity['id'],
  ) {
    const ids = await entityManager
      .find(AllFrontComponentEntity, {
        select: ['id'],
        where: {
          frontComponentId,
        },
      })
      .then((r) => r.map((o) => o.id));

    const willDeleteIds = difference(ids, allFrontComponentIds);
    const willUpdateIds = difference(allFrontComponentIds, ids);

    if (willDeleteIds.length > 0) {
      await entityManager.update(
        AllFrontComponentEntity,
        {
          seqNo: In(willDeleteIds),
        },
        {
          frontComponentId: null,
        },
      );
    }

    if (willUpdateIds.length > 0) {
      await entityManager.update(
        AllFrontComponentEntity,
        {
          seqNo: In(willUpdateIds),
        },
        {
          frontComponentId,
        },
      );
    }
  }
}
