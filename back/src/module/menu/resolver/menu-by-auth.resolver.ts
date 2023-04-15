import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { MenuService } from '@modules/menu';
import { GqlAuthGuard } from '@auth/guard';
import {
  MenuRepository,
  MenuRoleMapRepository,
} from '@modules/menu/repository';
import { RoleRepository } from '@modules/role/repository';
import { MenuByAuthOutput } from '@modules/menu/dto/output';
import { CurrentUser } from '@common/decorator/CurrentUser';
import { AfterAT } from '@auth/interfaces/AfterAT';
import { MessageConstant } from '@common/constants';
import { GqlError } from '@common/error/GqlError';
import { MenuRoleMapEntity } from '@modules/menu/entity';

@UseGuards(GqlAuthGuard)
@Resolver(() => MenuByAuthOutput)
export class MenuByAuthResolver {
  private readonly logger = new Logger(MenuByAuthResolver.name);

  constructor(
    private readonly menuService: MenuService,
    private readonly menuRepository: MenuRepository,
    private readonly menuRoleMapRepository: MenuRoleMapRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  /**************************************
   *              QUERY
   ***************************************/

  @Query(() => MenuByAuthOutput)
  async menuByAuth(
    @Args('menuSeqNo', {
      type: () => Int,
    })
    menuSeqNo: number,
    @CurrentUser()
    { roleSeqNo }: AfterAT,
  ): Promise<MenuByAuthOutput> {
    const menu = await this.menuRepository
      .createQueryBuilder('menu')
      .innerJoinAndSelect(`menu.menuRoleMaps`, `mrm`)
      .where(`mrm.menuSeqNo = :menuSeqNo AND mrm.roleSeqNo = :roleSeqNo`, {
        menuSeqNo,
        roleSeqNo,
      })
      .getOneOrFail();

    const menuByAuthOutput = menu.toMenuByAuthOutput();
    if (menuByAuthOutput) {
      return menuByAuthOutput;
    } else {
      throw new GqlError(MessageConstant.NOT_FOUND_VALUE());
    }
  }

  @ResolveField(() => [MenuByAuthOutput])
  async children(
    @Parent() { seqNo, roleSeqNo }: MenuByAuthOutput,
  ): Promise<Array<MenuByAuthOutput>> {
    const menus = await this.menuRepository
      .createQueryBuilder('m')
      .innerJoin(
        MenuRoleMapEntity,
        `child`,
        `m.seqNo = child.menuSeqNo AND child.roleSeqNo = :roleSeqNo`,
        {
          roleSeqNo,
        },
      )
      .innerJoin(
        MenuRoleMapEntity,
        `parent`,
        `child.parentSeqNo = parent.seqNo AND parent.roleSeqNo = :roleSeqNo AND parent.menuSeqNo = :menuSeqNo`,
        {
          roleSeqNo,
          menuSeqNo: seqNo,
        },
      )
      .getMany();
    return menus.map((menu) => menu.toMenuByAuthOutput()!);
  }
}
