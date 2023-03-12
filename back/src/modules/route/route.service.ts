import { Injectable, Logger } from '@nestjs/common';
import { Route } from './models/Route';
import { DataSource, In } from 'typeorm';
import { InsertRouteRequest } from './models/request/InsertRoute.request';
import { UpdateRouteRequest } from './models/request/UpdateRoute.request';
import { RouteRouteMap } from '@modules/route/models/RouteRouteMap';
import { RoleRouteMap } from '@modules/role/model/RoleRouteMap';
import { difference, isNil } from 'lodash';

@Injectable()
export class RouteService {
  constructor(private dataSource: DataSource) {}
  private readonly logger = new Logger(RouteService.name);

  async saveRoute(
    route: InsertRouteRequest | UpdateRouteRequest,
  ): Promise<Route> {
    return this.dataSource.manager.transaction(async (entityManager) => {
      console.log(1);
      const savedRoute = await entityManager.save(Route, {
        seqNo: route instanceof UpdateRouteRequest ? route.seqNo : undefined,
        path: route.path,
        frontComponentSeqNo: route.frontComponentSeqNo,
      });

      if (!isNil(route.childSeqNos)) {
        const routeRouteMapChildSeqNos = await entityManager
          .find(RouteRouteMap, {
            where: {
              parentSeqNo: savedRoute.seqNo,
            },
          })
          .then((r) => r?.map((o) => o.childSeqNo));

        const willDeletedRouteMapChildSeqNos = difference(
          routeRouteMapChildSeqNos,
          route.childSeqNos,
        );
        const willSavedRouteMapChildSeqNos = difference(
          route.childSeqNos,
          willDeletedRouteMapChildSeqNos,
        );

        if (willDeletedRouteMapChildSeqNos.length > 0) {
          await entityManager.delete(RouteRouteMap, {
            childSeqNo: In(willDeletedRouteMapChildSeqNos),
          });
        }

        if (willSavedRouteMapChildSeqNos.length > 0) {
          await entityManager.save(
            RouteRouteMap,
            willSavedRouteMapChildSeqNos.map((childSeqNo) =>
              RouteRouteMap.create({
                parentSeqNo: savedRoute.seqNo,
                childSeqNo,
              }),
            ),
          );
        }
      }

      if (!isNil(route.parentSeqNos)) {
        const routeRouteMapParentSeqNos = await entityManager
          .find(RouteRouteMap, {
            where: {
              childSeqNo: savedRoute.seqNo,
            },
          })
          .then((r) => r?.map((o) => o.parentSeqNo));

        const willDeletedRouteMapParentSeqNos = difference(
          routeRouteMapParentSeqNos,
          route.parentSeqNos,
        );
        const willSavedRouteMapParentSeqNos = difference(
          route.parentSeqNos,
          willDeletedRouteMapParentSeqNos,
        );

        console.log(
          willDeletedRouteMapParentSeqNos,
          willSavedRouteMapParentSeqNos,
        );
        if (willDeletedRouteMapParentSeqNos.length > 0) {
          await entityManager.delete(RouteRouteMap, {
            parentSeqNo: In(willDeletedRouteMapParentSeqNos),
          });
        }

        if (willSavedRouteMapParentSeqNos.length > 0) {
          await entityManager.save(
            RouteRouteMap,
            willSavedRouteMapParentSeqNos.map((parentSeqNo) =>
              RouteRouteMap.create({
                parentSeqNo,
                childSeqNo: savedRoute.seqNo,
              }),
            ),
          );
        }
      }

      if (route.roleSeqNos === null) {
        await entityManager.save(
          route.roleSeqNos.map((roleSeqNo) => {
            return RoleRouteMap.create({
              roleSeqNo,
              routeSeqNo: savedRoute.seqNo,
            });
          }),
        );
      }

      return savedRoute;
    });
  }
}
