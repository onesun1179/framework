import { CustomRepository } from '@common/decorator/CustomRepository';
import { Repository } from 'typeorm';
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';
import { Nullable } from '@common/type';
import { PagingInput } from '@common/dto/input/paging.input';
import { MessageEntitiesOutput } from '@modules/message/dto/output/message-entities.output';
import { RouteEntitiesInput } from '@modules/route/dto/input/route-entities.input';
import { UtilSearch } from '@common/util/Util.search';
import { UtilSort } from '@common/util/Util.sort';
import { UtilPaging } from '@common/util/Util.paging';

@CustomRepository(RouteEntity)
export class RouteEntityRepository extends Repository<RouteEntity> {
  async paging(
    pagingInput: Nullable<PagingInput>,
    routesInput: Nullable<RouteEntitiesInput>,
  ): Promise<MessageEntitiesOutput> {
    const qb = this.createQueryBuilder('r');

    if (routesInput) {
      const { search, sort } = routesInput;
      search && UtilSearch.setSearchByQB(qb, search);
      sort && UtilSort.setSortByQB(qb, sort);
    }

    return await UtilPaging.getRes({
      pagingInput,
      builder: qb,
      classRef: MessageEntitiesOutput,
    });
  }
}
