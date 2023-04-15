import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, In } from 'typeorm';
import { difference, isNil } from 'lodash';
import { RouteService } from '@modules/route/route.service';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/input/insert-all-front-component.input';
import { UpdateAllFrontComponentInput } from '@modules/front-component/dto/input/update-all-front-component.input';
import { AllFrontComponentEntity } from '@modules/front-component/entity/all-front-component.entity';
import { InsertFrontComponentInput } from '@modules/front-component/dto/input/insert-front-component.input';
import { UpdateFrontComponentInput } from '@modules/front-component/dto/input/update-front-component.input';
import { FrontComponentEntity } from '@modules/front-component/entity/front-component.entity';
import { RoleFrontComponentMapEntity } from '@modules/role/entity/role-front-component-map.entity';
import { RouteEntity } from '@modules/route/entity/route.entity';

@Injectable()
export class FrontComponentService {
  constructor(
    private routeService: RouteService,
    private dataSource: DataSource,
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
