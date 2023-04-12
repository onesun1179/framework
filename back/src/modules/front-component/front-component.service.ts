import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, In } from 'typeorm';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { difference, isNil } from 'lodash';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';
import { RoleFrontComponentMap } from '@modules/role/entities/role-front-component-map.entity';
import { Route } from '@modules/route/dto/route';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/insert-all-front-component.input';
import { UpdateAllFrontComponentInput } from '@modules/front-component/dto/update-all-front-component.input';
import { InsertFrontComponentInput } from '@modules/front-component/dto/insert-front-component.input';
import { UpdateFrontComponentInput } from '@modules/front-component/dto/update-front-component.input';
import { RouteService } from '@modules/route/route.service';
import { FrontComponentRepository } from '@modules/front-component/repositories/front-component.repository';
import { AllFrontComponentRepository } from '@modules/front-component/repositories/all-front-component.repository';

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
  ): Promise<AllFrontComponent> {
    return this.dataSource.manager.transaction(async (entityManager) => {
      return await entityManager.save(
        AllFrontComponent.create({
          id: p.id,
          frontComponentId: p.frontComponentId,
        }),
      );
    });
  }

  async saveFrontComponent(
    p: InsertFrontComponentInput | UpdateFrontComponentInput,
  ): Promise<FrontComponent> {
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
        FrontComponent.create({
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
      .find(RoleFrontComponentMap, {
        select: ['roleSeqNo'],
        where: {
          frontComponentId,
        },
      })
      .then((r) => r?.map((o) => o.roleSeqNo));

    const willDeleteRoleSeqNos = difference(foundRoleSeqNos, roleSeqNos);

    const willSaveRoleSeqNos = difference(roleSeqNos, willDeleteRoleSeqNos);

    if (willDeleteRoleSeqNos.length > 0) {
      await entityManager.delete(RoleFrontComponentMap, {
        roleSeqNo: In(willDeleteRoleSeqNos),
      });
    }

    if (willSaveRoleSeqNos.length > 0) {
      await entityManager.save(
        willSaveRoleSeqNos.map((o) =>
          RoleFrontComponentMap.create({
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
      .find(Route, {
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
        Route,
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
        Route,
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
    allFrontComponentIds: Array<AllFrontComponent['id']>,
    frontComponentId: FrontComponent['id'],
  ) {
    const ids = await entityManager
      .find(AllFrontComponent, {
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
        AllFrontComponent,
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
        AllFrontComponent,
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
