import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { MessagesOutput } from '@modules/message/dto/output/messages.output';
import { RoutesInput } from '@modules/route/dto/input/routes.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';

@CustomRepository(RouteOutput)
export class RouteRepository extends Repository<RouteOutput> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    routesInput: Nullable<RoutesInput>,
  ): Promise<MessagesOutput> {
    const qb = this.createQueryBuilder('r');

    if (routesInput) {
      const { search, sort } = routesInput;
      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: MessagesOutput,
    });
  }
}
