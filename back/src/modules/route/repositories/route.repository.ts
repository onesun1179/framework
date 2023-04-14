import { FindOptionsOrder, Repository } from 'typeorm';
import { Route } from '@modules/route/dto/route';
import { PagingInput } from '@common/dto/inputs/paging.input';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { UtilPaging } from '@common/utils/util.paging';
import { RoutesInput } from '@modules/route/dto/routes.input';
import { CustomRepository } from '@common/docorator/CustomRepository';
import { Nullable } from '@common/types';
import { PagedMessages } from '@modules/message/dto/output/paged-messages';
import { Message } from '@modules/message/entities/message';
import { UtilSearch } from '@common/utils/Util.search';
import { UtilSort } from '@common/utils/Util.sort';

@CustomRepository(Route)
export class RouteRepository extends Repository<Route> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    routesInput: Nullable<RoutesInput>,
  ): Promise<PagedMessages> {
    const qb = this.createQueryBuilder('r');
    let order: FindOptionsOrder<Route> = {};
    let where: FindOptionsWhere<Route> = {};

    if (routesInput) {
      const { search, sort } = routesInput;

      if (search) {
        where = {
          ...UtilSearch.bulkSearch(search),
          ...where,
        };
      }

      if (sort) {
        order = {
          ...UtilSort.getFindOptionsOrder<Message>(sort),
          ...order,
        };
      }
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb.setFindOptions({
        where,
        order,
      }),
      classRef: PagedMessages,
    });
  }
}
