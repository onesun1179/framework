import { Injectable, Logger } from '@nestjs/common';
import { Route } from './models/route';
import { DataSource, In } from 'typeorm';
import { InsertRouteRequest } from './models/request/insert-route.request';
import { UpdateRouteRequest } from './models/request/update-route.request';
import { RouteRouteMap } from '@modules/route/models/route-route-map';
import { RoleRouteMap } from '@modules/role/model/role-route-map';
import { difference, isNil } from 'lodash';

@Injectable()
export class RouteService {
  constructor(private dataSource: DataSource) {}
  private readonly logger = new Logger(RouteService.name);

  async saveRoute(
    route: InsertRouteRequest | UpdateRouteRequest,
  ): Promise<Route> {
    return this.dataSource.manager.transaction(async (entityManager) => {
      const savedRoute = await entityManager.save(Route, {
        seqNo: route instanceof UpdateRouteRequest ? route.seqNo : undefined,
        path: route.path,
        frontComponentId: route.frontComponentId,
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

      if (!isNil(route.roleSeqNos)) {
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
