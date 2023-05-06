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
import { RouteOutput } from '@modules/route/dto/output/entity/route.output';
import { RouteRepository } from '@modules/route/repository/route.repository';
import { RoleRepository } from '@modules/role/repository/role.repository';
import { RoutesOutput } from '@modules/route/dto/output/routes.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { RoutesInput } from '@modules/route/dto/input/routes.input';
import { RoleOutput } from '@modules/role/dto/output/entity/role.output';
import { RoleRouteMapOutput } from '@modules/role/dto/output/entity/role-route-map.output';
import { RouteTreeOutput } from '@modules/route/dto/output/route-tree.output';
import { MenuRepository } from '@modules/menu/repository/menu.repository';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { Nullable } from '@common/type';

@Resolver(() => RouteOutput)
export class RouteResolver {
  logger = new Logger(RouteResolver.name);

  constructor(
    private routeRepository: RouteRepository,
    private roleRepository: RoleRepository,
    private menuRepository: MenuRepository,
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
    seqNo: RouteOutput['seqNo'],
  ) {
    return await this.routeRepository.findOneOrFail({
      where: {
        seqNo,
      },
    });
  }

  @Query(() => RoutesOutput)
  async routes(
    @Args('paging', {
      type: () => PagingInput,
      nullable: true,
      defaultValue: null,
    })
    pagingInput: PagingInput,
    @Args('request', {
      type: () => RoutesInput,
      nullable: true,
    })
    routesInput: RoutesInput,
  ): Promise<RoutesOutput> {
    return this.routeRepository.paging(pagingInput, routesInput);
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => [RouteOutput])
  async children(
    @Parent() { seqNo: parentSeqNo }: RouteOutput,
  ): Promise<RouteOutput[]> {
    return await this.routeRepository
      .createQueryBuilder(`r`)
      .where(`r.parent_seq_no = :parentSeqNo`, {
        parentSeqNo,
      })
      .getMany();
  }

  @ResolveField(() => MenuEntity, {
    nullable: true,
  })
  async menu(
    @Parent() { seqNo: routeSeqNo }: RouteOutput,
  ): Promise<Nullable<MenuEntity>> {
    return await this.menuRepository
      .createQueryBuilder(`m`)
      .where(`m.route_seq_no = :routeSeqNo`, {
        routeSeqNo,
      })
      .getOne();
  }

  @ResolveField(() => [RoleOutput])
  async roles(@Parent() { seqNo }: RouteOutput): Promise<RoleOutput[]> {
    return await this.roleRepository
      .createQueryBuilder('r')
      .innerJoinAndSelect(RoleRouteMapOutput, 'rrm')
      .select('r')
      .where('rrm.routeSeqNo = :seqNo', {
        seqNo,
      })
      .getMany();
  }

  @ResolveField(() => RouteTreeOutput)
  async treeInfo(@Parent() { seqNo }: RouteOutput): Promise<RouteTreeOutput> {
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
            SELECT f.full_path AS fullPath
                 , f.depth
                 , (select COUNT(*) from route r where f.seq_no = r.parent_seq_no) as childCount
              FROM FullPath f
             WHERE f.seq_no = ${seqNo}
             LIMIT 1
        `,
      )
      .then((r) => r[0]);
  }

  /**************************************
   *           MUTATION
   ***************************************/
  // @Mutation(() => RouteOutput)
  // async insertRoute(
  //   @Args('req', {
  //     type: () => InsertRouteInput,
  //   })
  //   req: InsertRouteInput,
  // ): Promise<RouteOutput> {
  //   return await this.dataSource.transaction(async (e) => {
  //     return this.routeService.save(e, req);
  //   });
  // }

  // @Mutation(() => RouteOutput)
  // async updateRoute(
  //   @Args('req', {
  //     type: () => UpdateRouteRequest,
  //   })
  //   req: UpdateRouteRequest,
  // ): Promise<RouteOutput> {
  //   if (await this.routeService.hasSeqNo(e, req.seqNo)) {
  //     return this.routeService.save(e, req);
  //   }
  //
  // }
}
