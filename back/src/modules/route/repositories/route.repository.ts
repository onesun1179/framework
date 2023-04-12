import { In, IsNull, Like, Repository } from 'typeorm';
import { Route } from '@modules/route/dto/route';
import { PagingInput } from '@common/dto/inputs/paging.input';
import { PagedRoutes } from '@modules/route/dto/paged-routes';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilPaging } from '@common/utils/util.paging';
import { RoutesInput } from '@modules/route/dto/routes.input';
import { CustomRepository } from '@common/docorator/CustomRepository';

@CustomRepository(Route)
export class RouteRepository extends Repository<Route> {
  async getPaging(
    pagingRequest?: PagingInput,
    routesInput?: RoutesInput,
  ): Promise<PagedRoutes> {
    const qb = this.createQueryBuilder('r');
    const where: FindOptionsWhere<Route> = {};

    if (routesInput) {
      routesInput.rootYn && (where.parentSeqNo = IsNull());
      routesInput.seqNos && (where.seqNo = In(routesInput.seqNos));
      routesInput.path && (where.path = Like(`%${routesInput.path}%`));
      routesInput.parentSeqNo && (where.parentSeqNo = routesInput.parentSeqNo);
    }

    return await UtilPaging.getRes({
      pagingRequest,
      builder: qb.where(where),
      classRef: PagedRoutes,
    });
  }
}
