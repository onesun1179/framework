import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { PagingRequest } from './models/paging.request';

export class UtilPaging {
  static async getRes<Entity extends ObjectLiteral>(
    pagingRequest: PagingRequest,
    builder: SelectQueryBuilder<Entity>,
  ): Promise<{
    list: Entity[];
    total: number;
  }> {
    const [list, total] = await builder
      .skip(pagingRequest.skip)
      .take(pagingRequest.take)
      .getManyAndCount();
    return {
      list,
      total,
    };
  }
}
