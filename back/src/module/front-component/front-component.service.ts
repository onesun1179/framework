import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, In } from 'typeorm';
import { difference } from 'lodash';
import { RouteService } from '@modules/route/route.service';
import { InsertAllFrontComponentInput } from '@modules/front-component/dto/input/insert-all-front-component.input';
import { UpdateAllFrontComponentInput } from '@modules/front-component/dto/input/update-all-front-component.input';
import { AllFrontComponentOutput } from '@modules/front-component/dto/output/entity/all-front-component.output';
import { InsertFrontComponentInput } from '@modules/front-component/dto/input/insert-front-component.input';
import { UpdateFrontComponentInput } from '@modules/front-component/dto/input/update-front-component.input';
import { FrontComponentOutput } from '@modules/front-component/dto/output/entity/front-component.output';
import { RoleFrontComponentMapOutput } from '@modules/role/dto/output/entity/role-front-component-map.output';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';
import { UtilCommon } from '@common/util/Util.common';

@Injectable()
export class FrontComponentService {
  constructor(
    private routeService: RouteService,
    private dataSource: DataSource,
  ) {}

  async saveAllFrontComponent(
    p: InsertAllFrontComponentInput | UpdateAllFrontComponentInput,
  ): Promise<AllFrontComponentOutput> {
    return this.dataSource.manager.transaction(async (entityManager) => {
      return await entityManager.save(
        AllFrontComponentOutput.create({
          id: p.id,
          frontComponentId: p.frontComponentId,
        }),
      );
    });
  }

  async saveFrontComponent(
    p: InsertFrontComponentInput | UpdateFrontComponentInput,
  ): Promise<FrontComponentOutput> {
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
        FrontComponentOutput.create({
          id: p.id,
        }),
      );

      await UtilCommon.nilToNull(p.roleSeqNos, async (_) => {
        await this.saveRoleSeqNosToFrontComponent(
          entityManager,
          frontComponent.id,
          _,
        );
      });
      await UtilCommon.nilToNull(p.routeSeqNos, async (_) => {
        await this.saveRouteSeqNosToFrontComponent(
          entityManager,
          frontComponent.id,
          _,
        );
      });

      return frontComponent;
    });
  }

  async saveRoleSeqNosToFrontComponent(
    entityManager: EntityManager,
    frontComponentId: string,
    roleSeqNos: Array<number>,
  ) {
    const foundRoleSeqNos = await entityManager
      .find(RoleFrontComponentMapOutput, {
        select: ['roleSeqNo'],
        where: {
          frontComponentId,
        },
      })
      .then((r) => r?.map((o) => o.roleSeqNo));

    const willDeleteRoleSeqNos = difference(foundRoleSeqNos, roleSeqNos);

    const willSaveRoleSeqNos = difference(roleSeqNos, willDeleteRoleSeqNos);

    if (willDeleteRoleSeqNos.length > 0) {
      await entityManager.delete(RoleFrontComponentMapOutput, {
        roleSeqNo: In(willDeleteRoleSeqNos),
      });
    }

    if (willSaveRoleSeqNos.length > 0) {
      await entityManager.save(
        willSaveRoleSeqNos.map((o) =>
          RoleFrontComponentMapOutput.create({
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
      .find(RouteOutput, {
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
        RouteOutput,
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
        RouteOutput,
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
    allFrontComponentIds: Array<AllFrontComponentOutput['id']>,
    frontComponentId: FrontComponentOutput['id'],
  ) {
    const ids = await entityManager
      .find(AllFrontComponentOutput, {
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
        AllFrontComponentOutput,
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
        AllFrontComponentOutput,
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
