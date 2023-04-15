import { FindManyOptions, Repository } from 'typeorm';
import { RouteEntity } from '@modules/route/entity';
import { PagingInput } from '@common/dto/input';
import { UtilPaging } from '@util';
import { RoutesInput } from '@modules/route/dto/input';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { Nullable } from 'src/common/type';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { MessagesOutput } from '@modules/message/dto/output';

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
