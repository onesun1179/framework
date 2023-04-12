import { Injectable, Logger } from '@nestjs/common';
import { Route } from '@modules/route/dto/route';
import { EntityManager, In, IsNull, Like } from 'typeorm';
import { difference } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilPaging } from '@common/utils/util.paging';
import { PagingInput } from '@common/dto/inputs/paging.input';
import { PagedRoutes } from '@modules/route/dto/paged-routes';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { RouteRepository } from '@modules/route/repositories/route.repository';
import { RoutesInput } from '@modules/route/dto/routes.input';
import { InsertRouteInput } from '@modules/route/dto/insert-route.input';
import { UpdateRouteInput } from '@modules/route/dto/update-route.input';

@Injectable()
export class RouteService {
  constructor(
     private routeRepository: RouteRepository,
  ) {}
  private readonly logger = new Logger(RouteService.name);

  async getPaging(
    entityManager: EntityManager,
    pagingRequest: PagingInput,
    p: RoutesInput,
  ): Promise<PagedRoutes> {
    const qb = this.routeRepository.createQueryBuilder('r');
    const where: FindOptionsWhere<Route> = {};

    p.rootYn && (where.parentSeqNo = IsNull());
    p.seqNos && (where.seqNo = In(p.seqNos));
    p.path && (where.path = Like(`%${p.path}%`));
    p.parentSeqNo && (where.parentSeqNo = p.parentSeqNo);

    return await UtilPaging.getRes({
      pagingRequest,
      builder: qb.where(where),
      classRef: PagedRoutes,
    });
  }

  async save(
    e: EntityManager,
    p: InsertRouteInput | UpdateRouteInput,
  ): Promise<Route> {
    const route = await e.save(
      Route.create({
        seqNo: p instanceof UpdateRouteInput ? p.seqNo : undefined,
        path: p.path,
        parentSeqNo: p.parentSeqNo,
        frontComponentId: p.frontComponentId,
      }),
    );

    if (p.childSeqNos) {
      const childSeqNos = await e
        .find(Route, {
          select: ['seqNo'],
          where: {
            parentSeqNo: route.seqNo,
          },
        })
        .then((r) => r.map((o) => o.seqNo));

      const willDelChildSeqNos = difference(childSeqNos, p.childSeqNos);
      if (willDelChildSeqNos.length > 0) {
        await e.update(
          Route,
          {
            seqNo: In(willDelChildSeqNos),
          },
          {
            parentSeqNo: null,
          },
        );
      }

      await e.update(
        Route,
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
      .countBy(Route, {
        seqNo,
      })
      .then((r) => r > 0);
  }

  async updateFrontComponentByRoute(
    entityManager: EntityManager,
    routeSeqNos: Array<Route['seqNo']>,
    frontComponentId: FrontComponent['id'],
  ) {
    const seqNos = await entityManager
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
      await entityManager.update(
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
      await entityManager.update(
        Route,
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
