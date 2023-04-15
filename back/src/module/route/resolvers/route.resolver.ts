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
import { RouteEntity } from '@modules/route/entity';
import { Logger } from '@nestjs/common';
import { RoleEntity, RoleRouteMapEntity } from '@modules/role/entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import {
  InsertRouteInput,
  RoutesInput,
  RoutesOutput,
  RouteTreeOutput,
} from '@modules/route/dto';
import { PagingInput } from '@common/dto/input/paging.input';
import { RouteRepository } from '@modules/route/repositories';
import { RoleRepository } from '@modules/role/repository';

@Resolver(() => RouteEntity)
export class RouteResolver {
  constructor(
    private routeService: RouteService,
    private routeRepository: RouteRepository,
    private roleRepository: RoleRepository,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  logger = new Logger(RouteResolver.name);

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => RouteEntity)
  async routeBySeqNo(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: RouteEntity['seqNo'],
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

  @ResolveField(() => [RouteEntity], {
    defaultValue: [],
  })
  async children(@Parent() { seqNo }: RouteEntity): Promise<RouteEntity[]> {
    return await this.dataSource.manager.find(RouteEntity, {
      where: {
        parentSeqNo: seqNo,
      },
    });
  }

  @ResolveField(() => [RoleEntity])
  async roles(@Parent() { seqNo }: RouteEntity): Promise<RoleEntity[]> {
    return await this.roleRepository
      .createQueryBuilder('r')
      .innerJoinAndSelect(RoleRouteMapEntity, 'rrm')
      .select('r')
      .where('rrm.routeSeqNo = :seqNo', {
        seqNo,
      })
      .getMany();
  }

  @ResolveField(() => RouteTreeOutput)
  async treeInfo(@Parent() { seqNo }: RouteEntity): Promise<RouteTreeOutput> {
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
  @Mutation(() => RouteEntity)
  async insertRoute(
    @Args('req', {
      type: () => InsertRouteInput,
    })
    req: InsertRouteInput,
  ): Promise<RouteEntity> {
    return await this.dataSource.transaction(async (e) => {
      return this.routeService.save(e, req);
    });
  }

  // @Mutation(() => RouteEntity)
  // async updateRoute(
  //   @Args('req', {
  //     type: () => UpdateRouteRequest,
  //   })
  //   req: UpdateRouteRequest,
  // ): Promise<RouteEntity> {
  //   if (await this.routeService.hasSeqNo(e, req.seqNo)) {
  //     return this.routeService.save(e, req);
  //   }
  //
  // }
}
