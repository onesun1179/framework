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
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MenuEntitiesOutput } from '@modules/menu/dto/output/menu-entities.output';
import { PagingInput } from '@common/dto/input/paging.input';
import { MenuEntitiesInput } from '@modules/menu/dto/input/menu-entities.input';
import { RoleEntity } from '@modules/role/dto/output/entity/role.entity';
import { IconEntity } from '@modules/icon/dto/output/entity/icon.entity';
import { isNil } from 'lodash';
import { RouteEntity } from '@modules/route/dto/output/entity/route.entity';
import { MenuEntity } from '@modules/menu/dto/output/entity/menu.entity';
import { MenuRoleMapEntityRepository } from '@modules/menu/repository/menu-role-map-entity.repository';
import { RoleEntityRepository } from '@modules/role/repository/role-entity.repository';
import { IconEntityRepository } from '@modules/icon/repository/icon-entity.repository';
import { RouteEntityRepository } from '@modules/route/repository/route-entity.repository';

@UseGuards(GqlAuthGuard)
@Resolver(() => MenuEntity)
export class MenuEntityResolver {
  private readonly logger = new Logger(MenuEntityResolver.name);

  constructor(
    private readonly menuService: MenuService,
    private readonly menuRepository: MenuEntityRepository,
    private readonly menuRoleMapRepository: MenuRoleMapEntityRepository,
    private readonly roleRepository: RoleEntityRepository,
    private readonly iconEntityRepository: IconEntityRepository,
    private readonly routeRepository: RouteEntityRepository,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => MenuEntity)
  async menuEntity(
    @Args('seqNo', {
      type: () => Int,
    })
    seqNo: number,
  ) {
    return await this.menuRepository.findOneOrFail({
      where: {
        seqNo,
      },
    });
  }

  @Query(() => MenuEntitiesOutput)
  async menuEntities(
    @Args('pagingInput', {
      type: () => PagingInput,
      nullable: true,
    })
    pagingInput: PagingInput,
    @Args('menusInput', {
      type: () => MenuEntitiesInput,
      nullable: true,
    })
    menusInput: MenuEntitiesInput,
  ): Promise<MenuEntitiesOutput> {
    return await this.menuRepository.paging(pagingInput, menusInput);
  }

  /**************************************
   *           RESOLVE_FIELD
   ***************************************/

  @ResolveField(() => [RoleEntity])
  async roleEntities(
    @Parent() { seqNo }: MenuEntity,
  ): Promise<Array<RoleEntity>> {
    return await this.roleRepository
      .createQueryBuilder(`r`)
      .innerJoin(`r.menuRoleMaps`, `mrm`)
      .where(`mrm.menuSeqNo = :menuSeqNo`, {
        menuSeqNo: seqNo,
      })
      .getMany();
  }

  @ResolveField(() => IconEntity, {
    nullable: true,
  })
  async iconEntity(
    @Parent() { iconSeqNo }: MenuEntity,
  ): Promise<IconEntity | null> {
    if (!isNil(iconSeqNo)) {
      return await this.iconEntityRepository.findOne({
        where: {
          seqNo: iconSeqNo,
        },
      });
    }
    return null;
  }

  @ResolveField(() => RouteEntity, {
    nullable: true,
  })
  async routeEntity(
    @Parent() { routeSeqNo }: MenuEntity,
  ): Promise<RouteEntity | null> {
    if (!isNil(routeSeqNo)) {
      return await this.routeRepository.findOne({
        where: {
          seqNo: routeSeqNo!,
        },
      });
    }
    return null;
  }
}
