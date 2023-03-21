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
import { Route } from '../models/route';
import { Logger } from '@nestjs/common';
import { FrontComponent } from '@modules/front-component/model/front-component';
import { Role } from '@modules/role/model/role';
import { InsertRouteRequest } from '../models/request/insert-route.request';
import { UpdateRouteRequest } from '@modules/route/models/request/update-route.request';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RouteTree } from '@modules/route/models/route-tree';

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
    return await Route.findOneBy({
      seqNo,
    });
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => FrontComponent, {
    nullable: true,
  })
  frontComponent(
    @Parent() { frontComponentId }: Route,
  ): Promise<FrontComponent | null> {
    if (frontComponentId) {
      return FrontComponent.findOneBy({
        id: frontComponentId,
      });
    }
    return null;
  }

  @ResolveField(() => [Route], {
    defaultValue: [],
  })
  async children(@Parent() { seqNo }: Route): Promise<Route[]> {
    return await this.dataSource
      .createQueryBuilder<Route>(Route, 'route')
      .where('route.parentSeqNo = :seqNo', {
        seqNo,
      })
      .getMany();
  }

  @ResolveField(() => Route)
  async parent(@Parent() { parentSeqNo }: Route): Promise<Route> {
    return await Route.findOne({
      where: {
        seqNo: parentSeqNo,
      },
    });
  }

  @ResolveField(() => [Role])
  async roles(@Parent() { seqNo }: Route): Promise<Role[]> {
    return await Route.findOne({
      select: ['roleRouteMaps'],
      relations: {
        roleRouteMaps: true,
      },
      where: {
        seqNo,
      },
    }).then((r) => r?.roleRouteMaps.map((o) => o.role));
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
        SELECT full_path as fullPath
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
    @Args('insertRouteRequest', {
      type: () => InsertRouteRequest,
    })
    insertRouteRequest: InsertRouteRequest,
  ): Promise<Route> {
    console.log({
      ...insertRouteRequest,
    });
    return await this.routeService.saveRoute(insertRouteRequest);
  }

  @Mutation(() => Route)
  async updateRoute(
    @Args('updateRouteRequest', {
      type: () => UpdateRouteRequest,
    })
    updateRouteRequest: UpdateRouteRequest,
  ): Promise<Route> {
    if (
      (await Route.countBy({
        seqNo: updateRouteRequest.seqNo,
      })) === 0
    ) {
      throw new Error();
    }
    return await this.routeService.saveRoute(updateRouteRequest);
  }
}
