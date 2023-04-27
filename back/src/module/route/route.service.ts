import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { difference } from 'lodash';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { InsertRouteInput } from '@modules/route/dto/input/insert-route.input';
import { UpdateRouteInput } from '@modules/route/dto/input/update-route.input';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';

@Injectable()
export class RouteService {
  private readonly logger = new Logger(RouteService.name);

  constructor(private routeRepository: RouteRepository) {}

  async save(
    e: EntityManager,
    p: InsertRouteInput | UpdateRouteInput,
  ): Promise<RouteOutput> {
    const route = await e.save(
      RouteOutput.create({
        seqNo: p instanceof UpdateRouteInput ? p.seqNo : undefined,
        path: p.path,
        parentSeqNo: p.parentSeqNo,
        frontComponentId: p.frontComponentId,
      }),
    );

    if (p.childSeqNos) {
      const childSeqNos = await e
        .find(RouteOutput, {
          select: ['seqNo'],
          where: {
            parentSeqNo: route.seqNo,
          },
        })
        .then((r) => r.map((o) => o.seqNo));

      const willDelChildSeqNos = difference(childSeqNos, p.childSeqNos);
      if (willDelChildSeqNos.length > 0) {
        await e.update(
          RouteOutput,
          {
            seqNo: In(willDelChildSeqNos),
          },
          {
            parentSeqNo: null,
          },
        );
      }

      await e.update(
        RouteOutput,
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
      .countBy(RouteOutput, {
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
      .find(RouteOutput, {
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
        RouteOutput,
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
        RouteOutput,
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
