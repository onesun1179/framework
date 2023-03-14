import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, In } from 'typeorm';
import { InsertFrontComponentTypeRequest } from '@modules/front-component/model/requests/insert-front-component-type.request';
import { UpdateFrontComponentTypeRequest } from '@modules/front-component/model/requests/update-front-component-type.request';
import { FrontComponentType } from '@modules/front-component/model/front-component-type';
import { FrontComponent } from '@modules/front-component/model/front-component';
import { difference, isNil } from 'lodash';
import { InsertAllFrontComponentRequest } from '@modules/front-component/model/requests/insert-all-front-component.request';
import { UpdateAllFrontComponentRequest } from '@modules/front-component/model/requests/update-all-front-component.request';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';
import { InsertFrontComponentRequest } from '@modules/front-component/model/requests/insert-front-component.request';
import { UpdateFrontComponentRequest } from '@modules/front-component/model/requests/update-front-component.request';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';
import { Route } from '@modules/route/models/route';

@Injectable()
export class FrontComponentService {
  constructor(private dataSource: DataSource) {}

  async saveFrontComponentType(
    p: InsertFrontComponentTypeRequest | UpdateFrontComponentTypeRequest,
  ): Promise<FrontComponentType> {
    return this.dataSource.manager.transaction(async (entityManager) => {
      const frontComponentType = await entityManager.save(
        FrontComponentType,
        FrontComponentType.create({
          seqNo:
            p instanceof UpdateFrontComponentTypeRequest ? p.seqNo : undefined,
          name: p.name,
        }),
      );

      if (p.frontComponentSeqNos) {
        if (
          (await entityManager.countBy(FrontComponent, {
            seqNo: In(p.frontComponentSeqNos),
          })) !== p.frontComponentSeqNos.length
        ) {
          throw new Error('갯수 다름');
        }
        const frontComponentSeqNos = await entityManager
          .find(FrontComponent, {
            select: ['seqNo'],
            where: {
              frontComponentTypeSeqNo: frontComponentType.seqNo,
            },
          })
          .then((o) => o?.map((oo) => oo.seqNo));

        const willDeleteFrontComponentSeqNos = difference(
          frontComponentSeqNos,
          p.frontComponentSeqNos,
        );
        const willSaveFrontComponentSeqNos = difference(
          p.frontComponentSeqNos,
          willDeleteFrontComponentSeqNos,
        );

        if (willDeleteFrontComponentSeqNos.length > 0) {
          await entityManager.update(
            FrontComponent,
            {
              seqNo: In(willDeleteFrontComponentSeqNos),
            },
            {
              frontComponentTypeSeqNo: null,
            },
          );
        }

        if (willSaveFrontComponentSeqNos.length > 0) {
          await entityManager.update(
            FrontComponent,
            {
              seqNo: In(willSaveFrontComponentSeqNos),
            },
            {
              frontComponentTypeSeqNo: frontComponentType.seqNo,
            },
          );
        }
      }
      return frontComponentType;
    });
  }

  async saveAllFrontComponent(
    p: InsertAllFrontComponentRequest | UpdateAllFrontComponentRequest,
  ): Promise<AllFrontComponent> {
    return this.dataSource.manager.transaction(async (r) => {
      console.log({ ...p });
      return await r.save(
        AllFrontComponent.create({
          seqNo: p.seqNo,
          frontComponentSeqNo: p.frontComponentSeqNo,
        }),
      );
    });
  }

  async saveFrontComponent(
    p: InsertFrontComponentRequest | UpdateFrontComponentRequest,
  ): Promise<FrontComponent> {
    return this.dataSource.manager.transaction(async (r) => {
      const frontComponent = await r.save(
        FrontComponent.create({
          seqNo: p instanceof UpdateFrontComponentRequest ? p.seqNo : undefined,
          frontComponentTypeSeqNo: p.frontComponentTypeSeqNo,
          initialFrontComponentSeqNo: p.initialFrontComponentSeqNo,
        }),
      );

      if (!isNil(p.roleSeqNos)) {
        await this.saveRoleSeqNosToFrontComponent(
          r,
          frontComponent.seqNo,
          p.roleSeqNos,
        );
      }

      if (!isNil(p.routeSeqNos)) {
        await this.saveRouteSeqNosToFrontComponent(
          r,
          frontComponent.seqNo,
          p.routeSeqNos,
        );
      }

      return frontComponent;
    });
  }

  async saveRoleSeqNosToFrontComponent(
    entityManager: EntityManager,
    frontComponentSeqNo: number,
    roleSeqNos: Array<number>,
  ) {
    const foundRoleSeqNos = await entityManager
      .find(RoleFrontComponentMap, {
        select: ['roleSeqNo'],
        where: {
          frontComponentSeqNo,
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
            frontComponentSeqNo,
          }),
        ),
      );
    }
  }

  async saveRouteSeqNosToFrontComponent(
    entityManager: EntityManager,
    frontComponentSeqNo: number,
    routeSeqNos: Array<number>,
  ) {
    const foundRouteSeqNos = await entityManager
      .find(Route, {
        select: ['seqNo'],
        where: {
          frontComponentSeqNo,
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
          frontComponentSeqNo: null,
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
          frontComponentSeqNo,
        },
      );
    }
  }
}
