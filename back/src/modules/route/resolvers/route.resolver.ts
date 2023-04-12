import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RouteService } from '../route.service';
import { Route } from '@modules/route/dto/route';
import { Logger } from '@nestjs/common';
import { Role } from '@modules/role/entities/role.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RoleRouteMap } from '@modules/role/entities/role-route-map.entity';

import { RouteTree } from '@modules/route/dto/route-tree';
import { PagedRoutes } from '@modules/route/dto/paged-routes';
import { PagingInput } from '@common/dto/inputs/paging.input';
import { RoutesInput } from '@modules/route/dto/routes.input';
import { InsertRouteInput } from '@modules/route/dto/insert-route.input';

@Resolver(() => Route)
export class RouteResolver {
  constructor(
    private routeService: RouteService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  logger = new Logger(RouteResolver.name);

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => Route)
  async route(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: Route['seqNo'],
  ) {
    return await this.dataSource.manager.findOne(Route, {
      where: {
        seqNo,
      },
    });
  }

  @Query(() => PagedRoutes)
  async routes(
    @Args('paging', {
      type: () => PagingInput,
      nullable: true,
    })
    paging: PagingInput,
    @Args('request', {
      type: () => RoutesInput,
      nullable: true,
    })
    req: RoutesInput,
  ): Promise<PagedRoutes> {
    return this.dataSource.transaction(async (e) => {
      return this.routeService.getPaging(e, paging, req);
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => [Route], {
    defaultValue: [],
  })
  async children(@Parent() { seqNo }: Route): Promise<Route[]> {
    return await this.dataSource.manager.find(Route, {
      where: {
        parentSeqNo: seqNo,
      },
    });
  }

  // @ResolveField(() => Route)
  // async parent(@Parent() { parentSeqNo }: Route): Promise<Route> {
  //   return await this.dataSource.manager.findOne(Route, {
  //     where: {
  //       seqNo: parentSeqNo,
  //     },
  //   });
  // }

  // @ResolveField(() => FrontComponent)
  // async frontComponent(
  //   @Parent() { frontComponentId }: Route,
  // ): Promise<FrontComponent> {
  //   return await this.dataSource.manager.findOne(FrontComponent, {
  //     where: {
  //       id: frontComponentId,
  //     },
  //   });
  // }

  @ResolveField(() => [Role])
  async roles(@Parent() { seqNo }: Route): Promise<Role[]> {
    return await this.dataSource
      .createQueryBuilder(Role, 'r')
      .innerJoinAndSelect(RoleRouteMap, 'rrm')
      .select('r')
      .where('rrm.routeSeqNo = :seqNo', {
        seqNo,
      })
      .getMany();
  }

  @ResolveField(() => RouteTree)
  async routeTree(@Parent() { seqNo }: Route): Promise<RouteTree> {
    return await this.dataSource
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

  /**************************************
   *           MUTATION
   ***************************************/
  @Mutation(() => Route)
  async insertRoute(
    @Args('req', {
      type: () => InsertRouteInput,
    })
    req: InsertRouteInput,
  ): Promise<Route> {
    return await this.dataSource.transaction(async (e) => {
      return this.routeService.save(e, req);
    });
  }

  // @Mutation(() => Route)
  // async updateRoute(
  //   @Args('req', {
  //     type: () => UpdateRouteRequest,
  //   })
  //   req: UpdateRouteRequest,
  // ): Promise<Route> {
  //   if (await this.routeService.hasSeqNo(e, req.seqNo)) {
  //     return this.routeService.save(e, req);
  //   }
  //
  // }
}
