import { Injectable, Logger } from '@nestjs/common';
import { Route } from './models/route';
import { DataSource } from 'typeorm';
import { InsertRouteRequest } from './models/request/insert-route.request';
import { UpdateRouteRequest } from './models/request/update-route.request';
import { RoleRouteMap } from '@modules/role/model/role-route-map';
import { difference, isNil } from 'lodash';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class RouteService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}
  private readonly logger = new Logger(RouteService.name);

  async saveRoute(
    route: InsertRouteRequest | UpdateRouteRequest,
  ): Promise<Route> {
    return this.dataSource.manager.transaction(async (entityManager) => {
      const savedRoute = await entityManager.save(Route, {
        seqNo: route instanceof UpdateRouteRequest ? route.seqNo : undefined,
        path: route.path,
        frontComponentId: route.frontComponentId,
        parentSeqNo: route.parentSeqNo,
      });

      if (!isNil(route.childSeqNos)) {
        const childSeqNos = await entityManager
          .createQueryBuilder(Route, 'route')
          .select('route.seqNo')
          .where(`route.parentSeqNo = :parentSeqNo`, {
            parentSeqNo: savedRoute.seqNo,
          })
          .getMany()
          .then((r) => r?.map((o) => o.seqNo));

        const willDeleteSeqNos = difference(childSeqNos, route.childSeqNos);
        const willInsertSeqNos = difference(
          route.childSeqNos,
          willDeleteSeqNos,
        );

        if (willDeleteSeqNos.length > 0) {
          await entityManager
            .createQueryBuilder()
            .update()
            .set({
              parentSeqNo: null,
            })
            .where(`seqNo IN (:...willDeleteSeqNos)`, {
              willDeleteSeqNos,
            })

            .execute();
        }

        if (willInsertSeqNos.length > 0) {
          await entityManager
            .createQueryBuilder()
            .update()
            .set({
              parentSeqNo: savedRoute.seqNo,
            })
            .where(`seqNo IN (:...willInsertSeqNos)`, {
              willInsertSeqNos,
            })
            .execute();
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
