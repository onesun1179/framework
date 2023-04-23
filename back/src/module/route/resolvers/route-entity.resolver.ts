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
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';
import { RouteEntityRepository } from '@modules/route/repository/route-entity.repository';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { RouteEntitiesOutput } from '@modules/route/dto/output/route-entities.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { RouteEntitiesInput } from '@modules/route/dto/input/route-entities.input';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { RoleRouteMapEntity } from '@modules/role/dto/output/entity/role-route-map.entity';
import { RouteTreeOutput } from '@modules/route/dto/output/route-tree.output';

@Resolver(() => RouteEntity)
export class RouteEntityResolver {
  logger = new Logger(RouteEntityResolver.name);

  constructor(
    private routeRepository: RouteEntityRepository,
    private roleRepository: RoleEntityRepository,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/
  @Query(() => RouteEntity)
  async routeEntity(
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

  @Query(() => RouteEntitiesOutput)
  async routeEntities(
    @Args('paging', {
      type: () => PagingInput,
      nullable: true,
      defaultValue: null,
    })
    pagingInput: PagingInput,
    @Args('request', {
      type: () => RouteEntitiesInput,
      nullable: true,
    })
    routesInput: RouteEntitiesInput,
  ): Promise<RouteEntitiesOutput> {
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
  // @Mutation(() => RouteEntity)
  // async insertRoute(
  //   @Args('req', {
  //     type: () => InsertRouteEntityInput,
  //   })
  //   req: InsertRouteEntityInput,
  // ): Promise<RouteEntity> {
  //   return await this.dataSource.transaction(async (e) => {
  //     return this.routeService.save(e, req);
  //   });
  // }

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
