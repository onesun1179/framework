import { FindManyOptions, Repository } from 'typeorm';
import { RouteEntity } from '@modules/route/entity';
import { PagingInput } from '@common/dto/input/paging.input';
import { UtilPaging } from '@util/Util.paging';
import { RoutesInput } from '@modules/route/dto';
import { CustomRepository } from '@common/decorator/CustomRepository';
import { Nullable } from 'src/common/type';
import { MessagesOutput } from '@modules/message/dto';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';

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
