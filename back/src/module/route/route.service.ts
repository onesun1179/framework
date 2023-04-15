import { Injectable, Logger } from '@nestjs/common';
import { RouteEntity } from '@modules/route/entity';
import { EntityManager, In } from 'typeorm';
import { difference } from 'lodash';
import { FrontComponentEntity } from '@modules/front-component/entity';
import { RouteRepository } from '@modules/route/repositories';
import { InsertRouteInput, UpdateRouteInput } from '@modules/route/dto';

@Injectable()
export class RouteService {
  constructor(private routeRepository: RouteRepository) {}
  private readonly logger = new Logger(RouteService.name);

  async save(
    e: EntityManager,
    p: InsertRouteInput | UpdateRouteInput,
  ): Promise<RouteEntity> {
    const route = await e.save(
      RouteEntity.create({
        seqNo: p instanceof UpdateRouteInput ? p.seqNo : undefined,
        path: p.path,
        parentSeqNo: p.parentSeqNo,
        frontComponentId: p.frontComponentId,
      }),
    );

    if (p.childSeqNos) {
      const childSeqNos = await e
        .find(RouteEntity, {
          select: ['seqNo'],
          where: {
            parentSeqNo: route.seqNo,
          },
        })
        .then((r) => r.map((o) => o.seqNo));

      const willDelChildSeqNos = difference(childSeqNos, p.childSeqNos);
      if (willDelChildSeqNos.length > 0) {
        await e.update(
          RouteEntity,
          {
            seqNo: In(willDelChildSeqNos),
          },
          {
            parentSeqNo: null,
          },
        );
      }

      await e.update(
        RouteEntity,
        {
          seqNo: In(p.childSeqNos),
        },
        {
          parentSeqNo: route.seqNo,
        },
      );
    }

    return route;
  }
  async hasSeqNo(e: EntityManager, seqNo: number): Promise<boolean> {
    return await e
      .countBy(RouteEntity, {
        seqNo,
      })
      .then((r) => r > 0);
  }

  async updateFrontComponentByRoute(
    entityManager: EntityManager,
    routeSeqNos: Array<RouteEntity['seqNo']>,
    frontComponentId: FrontComponentEntity['id'],
  ) {
    const seqNos = await entityManager
      .find(RouteEntity, {
        select: ['seqNo'],
        where: {
          frontComponentId,
        },
      })
      .then((r) => r.map((o) => o.seqNo));

    const willDeleteSeqNos = difference(seqNos, routeSeqNos);
    const willUpdateSeqNos = difference(routeSeqNos, seqNos);

    if (willDeleteSeqNos.length > 0) {
      await entityManager.update(
        RouteEntity,
        {
          seqNo: In(willDeleteSeqNos),
        },
        {
          frontComponentId: null,
        },
      );
    }

    if (willUpdateSeqNos.length > 0) {
      await entityManager.update(
        RouteEntity,
        {
          seqNo: In(willUpdateSeqNos),
        },
        {
          frontComponentId,
        },
      );
    }
  }
}
