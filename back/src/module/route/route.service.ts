import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { difference } from 'lodash';
import { RouteEntityRepository } from '@modules/route/repository/route-entity.repository';
import { InsertRouteEntityInput } from '@modules/route/dto/input/insert-route-entity.input';
import { UpdateRouteEntityInput } from '@modules/route/dto/input/update-route-entity.input';
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';

@Injectable()
export class RouteService {
  private readonly logger = new Logger(RouteService.name);

  constructor(private routeRepository: RouteEntityRepository) {}

  async save(
    e: EntityManager,
    p: InsertRouteEntityInput | UpdateRouteEntityInput,
  ): Promise<RouteEntity> {
    const route = await e.save(
      RouteEntity.create({
        seqNo: p instanceof UpdateRouteEntityInput ? p.seqNo : undefined,
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
    routeSeqNos: Array<number>,
    frontComponentId: string,
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
