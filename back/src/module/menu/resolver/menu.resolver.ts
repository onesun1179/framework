import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@auth/guard/gql-auth.guard';
import { MenuService } from '@modules/menu/menu.service';
import { MenuEntityRepository } from '@modules/menu/repository/menu-entity.repository';
import { MenuRoleMapEntityRepository } from '@modules/menu/repository/menu-role-map-entity.repository';
import { MenuOutput } from '@modules/menu/dto/output/menu.output';
import { CurrentUser } from '@common/decorator/CurrentUser';
import { AfterAT } from '@auth/interfaces/AfterAT';
import { IconOutput } from '@modules/icon/dto/output/icon.output';
import { isNil } from 'lodash';
import { IconEntityRepository } from '@modules/icon/repository/icon-entity.repository';
import { RouteOutput } from '@modules/route/dto/output/route.output';
import { RouteEntityRepository } from '@modules/route/repository/route-entity.repository';

@UseGuards(GqlAuthGuard)
@Resolver(() => MenuOutput)
export class MenuResolver {
  private readonly logger = new Logger(MenuResolver.name);

  constructor(
    private readonly menuService: MenuService,
    private readonly menuEntityRepository: MenuEntityRepository,
    private readonly routeRepository: RouteEntityRepository,
    private readonly iconEntityRepository: IconEntityRepository,
    private readonly menuRoleMapRepository: MenuRoleMapEntityRepository,
  ) {}

  @Query(() => MenuOutput)
  async menu(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ): Promise<MenuOutput> {
    return await this.menuRoleMapRepository
      .createQueryBuilder(`mrm`)
      .innerJoinAndSelect(`mrm.menu`, 'm')
      .where(`mrm.seqNo = :seqNo`, {
        seqNo,
      })
      .getOneOrFail()
      .then((r) => r.toMenuOutput());
  }

  @Query(() => [MenuOutput])
  async menus(@CurrentUser() { roleSeqNo }: AfterAT): Promise<MenuOutput[]> {
    return await this.menuRoleMapRepository
      .createQueryBuilder(`mrm`)
      .innerJoinAndSelect(`mrm.menu`, 'm')
      .where(`mrm.roleSeqNo = :roleSeqNo AND mrm.parentSeqNo IS NULL`, {
        roleSeqNo,
      })
      .getMany()
      .then((r) => r.map((o) => o.toMenuOutput()));
  }

  /**************************************
   *              QUERY
   ***************************************/

  @ResolveField(() => [MenuOutput])
  async children(
    @Parent() { seqNo: parentSeqNo }: MenuOutput,
  ): Promise<MenuOutput[]> {
    return await this.menuRoleMapRepository
      .createQueryBuilder(`mrm`)
      .innerJoinAndSelect(`mrm.menu`, 'm')
      .where(
        `
      mrm.parentSeqNo = :parentSeqNo
      `,
        {
          parentSeqNo,
        },
      )
      .getMany()
      .then((r) => r.map((o) => o.toMenuOutput()));
  }

  @ResolveField(() => IconOutput, {
    nullable: true,
  })
  async icon(@Parent() { iconSeqNo }: MenuOutput): Promise<IconOutput | null> {
    if (isNil(iconSeqNo)) return null;
    return this.iconEntityRepository
      .createQueryBuilder(`icon`)
      .where(`icon.seqNo = :iconSeqNo`, {
        iconSeqNo,
      })
      .getOneOrFail()
      .then((r) => r.toIconOutput());
  }

  @ResolveField(() => RouteOutput, {
    nullable: true,
  })
  async route(
    @Parent() { routeSeqNo }: MenuOutput,
  ): Promise<RouteOutput | null> {
    if (isNil(routeSeqNo)) return null;
    return this.routeRepository
      .createQueryBuilder(`route`)
      .where(`route.seqNo =:routeSeqNo`, {
        routeSeqNo,
      })
      .getOneOrFail()
      .then((r) => r.toRouteOutput());
  }
}
