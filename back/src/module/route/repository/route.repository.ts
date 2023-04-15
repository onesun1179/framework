import { CustomRepository } from '@common/decorator/CustomRepository';
import { FindManyOptions, Repository } from 'typeorm';
import { RouteEntity } from '../entity/route.entity';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { MessagesOutput } from '@modules/message/dto/output/messages.output';
import { RoutesInput } from '@modules/route/dto/input/routes.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';

@CustomRepository(RouteEntity)
export class RouteRepository extends Repository<RouteEntity> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    routesInput: Nullable<RoutesInput>,
  ): Promise<MessagesOutput> {
    const qb = this.createQueryBuilder('r');
    const findOption: FindManyOptions<RouteEntity> = {};

    if (routesInput) {
      const { search, sort } = routesInput;

      if (search) {
        findOption.where = {
          ...findOption.where,
          ...UtilSearch.getFindOptionsWhere(search),
        };
      }

      if (sort) {
        findOption.order = {
          ...findOption.order,
          ...UtilSort.getFindOptionsOrder(sort),
        };
      }
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb.setFindOptions(findOption),
      classRef: MessagesOutput,
    });
  }
}
