import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, In } from 'typeorm';
import { InsertFrontComponentTypeRequest } from '@modules/front-component/model/requests/insert-front-component-type.request';
import { UpdateFrontComponentTypeRequest } from '@modules/front-component/model/requests/update-front-component-type.request';
import { FrontComponentType } from '@modules/front-component/model/front-component-type';
import { FrontComponent } from '@modules/front-component/model/front-component';
import { difference } from 'lodash';
import { InsertAllFrontComponentRequest } from '@modules/front-component/model/requests/insert-all-front-component.request';
import { UpdateAllFrontComponentRequest } from '@modules/front-component/model/requests/update-all-front-component.request';
import { AllFrontComponent } from '@modules/front-component/model/all-front-component';
import { InsertFrontComponentRequest } from '@modules/front-component/model/requests/insert-front-component.request';
import { UpdateFrontComponentRequest } from '@modules/front-component/model/requests/update-front-component.request';
import { RoleFrontComponentMap } from '@modules/role/model/role-front-component-map';

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

      if (p.frontComponentIds) {
        if (
          (await entityManager.countBy(FrontComponent, {
            id: In(p.frontComponentIds),
          })) !== p.frontComponentIds.length
        ) {
          throw new Error('갯수 다름');
        }
        const frontComponentIds = await entityManager
          .find(FrontComponent, {
            select: ['id'],
            where: {
              frontComponentTypeSeqNo: frontComponentType.seqNo,
            },
          })
          .then((o) => o?.map((oo) => oo.id));

        const willDeleteFrontComponentIds = difference(
          frontComponentIds,
          p.frontComponentIds,
        );
        const willSaveFrontComponentIds = difference(
          p.frontComponentIds,
          willDeleteFrontComponentIds,
        );

        if (willDeleteFrontComponentIds.length > 0) {
          await entityManager.update(
            FrontComponent,
            {
              seqNo: In(willDeleteFrontComponentIds),
            },
            {
              frontComponentTypeSeqNo: null,
            },
          );
        }

        if (willSaveFrontComponentIds.length > 0) {
          await entityManager.update(
            FrontComponent,
            {
              seqNo: In(willSaveFrontComponentIds),
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
      return await r.save(
        AllFrontComponent.create({
          id: p.id,
          frontComponentId: p.frontComponentId,
        }),
      );
    });
  }

  async saveFrontComponent(
    p: InsertFrontComponentRequest | UpdateFrontComponentRequest,
  ): Promise<FrontComponent> {
    return this.dataSource.manager.transaction(async (r) => {});
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
}
