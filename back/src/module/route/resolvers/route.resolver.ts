import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RouteEntityRepository } from '@modules/route/repository/route-entity.repository';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { RouteOutput } from '@modules/route/dto/output/route.output';
import { RouteTreeOutput } from '@modules/route/dto/output/route-tree.output';

@Resolver(() => RouteOutput)
export class RouteResolver {
  logger = new Logger(RouteResolver.name);

  constructor(
    private routeRepository: RouteEntityRepository,
    private roleRepository: RoleEntityRepository,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => RouteOutput)
  async route(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<RouteOutput> {
    return await this.routeRepository
      .createQueryBuilder('route')
      .where(`route.seqNo = :seqNo`, {
        seqNo,
      })
      .getOneOrFail()
      .then((r) => r.toRouteOutput());
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/
  @ResolveField(() => RouteTreeOutput)
  async treeInfo(@Parent() { seqNo }: RouteOutput): Promise<RouteTreeOutput> {
    return await this.routeRepository
      .query(
        `
              WITH RECURSIVE FullPath (full_path, seq_no, parent_seq_no, depth)
                                 AS (
                                    SELECT path AS full_path, seq_no, parent_seq_no, 0 AS depth
                                      FROM route
                                     WHERE parent_seq_no IS NULL

                                     UNION ALL

                                    SELECT CONCAT(f.full_path,
                                                  IF(ISNULL(f.parent_seq_no) OR INSTR(r.path, '/') = 1, '', '/'),
                                                  r.path) AS full_path
                                         , r.seq_no
                                         , r.parent_seq_no
                                         , depth + 1      AS depth
                                      FROM FullPath f
                                         , route r
                                     WHERE r.parent_seq_no = f.seq_no )
            SELECT full_path AS fullPath
                 , depth
              FROM FullPath
             WHERE seq_no = ${seqNo}
             LIMIT 1
        `,
      )
      .then((r) => r[0]);
  }
}
