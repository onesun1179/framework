import { Injectable, Logger } from '@nestjs/common';
import { Route } from './models/route';
import { DataSource, EntityManager, In, IsNull, Like } from 'typeorm';
import { difference } from 'lodash';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  InsertRouteRequest,
  RoutesRequest,
  UpdateRouteRequest,
} from '@modules/route/models/route.request';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilPaging } from '@common/utils/util.paging';
import { PagedMessages } from '@modules/message/dto/output/paged-messages';
import { PagingInput } from '@common/dto/inputs/paging.input';
import { PagedRoutes } from '@modules/route/models/paged-routes';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';

@Injectable()
export class RouteService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}
  private readonly logger = new Logger(RouteService.name);

  async getPaging(
    entityManager: EntityManager,
    pagingRequest: PagingInput,
    p: RoutesRequest,
  ): Promise<PagedRoutes> {
    const where: FindOptionsWhere<Route> = {};

    p.rootYn && (where.parentSeqNo = IsNull());
    p.seqNos && (where.seqNo = In(p.seqNos));
    p.path && (where.path = Like(`%${p.path}%`));
    p.parentSeqNo && (where.parentSeqNo = p.parentSeqNo);

    return await UtilPaging.getRes(
      pagingRequest,
      entityManager.createQueryBuilder(Route, 'r').where(where),
      PagedMessages,
    );
  }

  async save(
    e: EntityManager,
    p: InsertRouteRequest | UpdateRouteRequest,
  ): Promise<Route> {
    const route = await e.save(
      Route.create({
        seqNo: p instanceof UpdateRouteRequest ? p.seqNo : undefined,
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
