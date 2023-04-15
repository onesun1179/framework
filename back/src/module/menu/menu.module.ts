import { MenuRoleMapEntity } from '@modules/menu/entity/menu-role-map.entity';
import { MenuEntity } from '@modules/menu/entity/menu.entity';
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuByAuthOutput } from '@modules/menu/dto/output/menu-by-auth.output';

import { MenuResolver } from '@modules/menu/resolver';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import {
  MenuRepository,
  MenuRoleMapRepository,
} from '@modules/menu/repository';
import { RoleRepository } from '@modules/role/repository';
import { MenuByAuthResolver } from '@modules/menu/resolver/menu-by-auth.resolver';

console.log({
  MenuEntity,
  MenuByAuthOutput,
});
@Module({
  imports: [
    TypeOrmModule.forFeature([MenuRoleMapEntity, MenuEntity]),
    TypeOrmExModule.forCustomRepository([
      MenuRepository,
      MenuRoleMapRepository,
      RoleRepository,
    ]),
  ],
  providers: [MenuService, MenuResolver, MenuByAuthResolver],
})
export class MenuModule {}
