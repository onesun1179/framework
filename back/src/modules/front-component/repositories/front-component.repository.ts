import { In } from 'typeorm';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { CustomRepository } from '@common/docorator/CustomRepository';
import { difference } from 'lodash';
import { Route } from '@modules/route/models/route';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';
import { EntityRepository } from '@common/repositories/entity.repository';

@CustomRepository(FrontComponent)
export class FrontComponentRepository extends EntityRepository<FrontComponent> {
  /**
   * 라우트 일련번호 리스트 갱신
   */
  async updateRouteSeqNos(
    frontComponentId: FrontComponent['id'],
    routeSeqNos: Array<Route['seqNo']>,
  ): Promise<[Array<number>, Array<number>]> {
    const seqNos = await this.manager
      .find(Route, {
        select: ['seqNo'],
        where: {
          frontComponentId,
        },
      })
      .then((r) => r.map((o) => o.seqNo));

    const willDeleteSeqNos = difference(seqNos, routeSeqNos);
    const willUpdateSeqNos = difference(routeSeqNos, seqNos);

    if (willDeleteSeqNos.length > 0) {
      await this.manager.update(
        Route,
        {
          seqNo: In(willDeleteSeqNos),
        },
        {
          frontComponentId: null,
        },
      );
    }

    if (willUpdateSeqNos.length > 0) {
      await this.manager.update(
        Route,
        {
          seqNo: In(willUpdateSeqNos),
        },
        {
          frontComponentId,
        },
      );
    }

    return [willDeleteSeqNos, willUpdateSeqNos];
  }

  /**
   * 모든 화면 컴포넌트 리스트 갱신
   * @param frontComponentId
   * @param allFrontComponentIds
   */
  async updateAllFrontComponentIds(
    frontComponentId: FrontComponent['id'],
    allFrontComponentIds: Array<AllFrontComponent['id']>,
  ): Promise<[Array<AllFrontComponent['id']>, Array<AllFrontComponent['id']>]> {
    const ids = await this.manager
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
      await this.manager.update(
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
      await this.manager.update(
        AllFrontComponent,
        {
          seqNo: In(willUpdateIds),
        },
        {
          frontComponentId,
        },
      );
    }

    return [willDeleteIds, willUpdateIds];
  }
}
