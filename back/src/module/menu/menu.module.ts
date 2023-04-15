import { Module } from '@nestjs/common';
import { MenuService } from '@modules/menu';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuByAuthOutput } from '@modules/menu/dto/output';

import { MenuByAuthResolver, MenuResolver } from '@modules/menu/resolver';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import {
  MenuRepository,
  MenuRoleMapRepository,
} from '@modules/menu/repository';
import { RoleRepository } from '@modules/role/repository';
import { MenuEntity, MenuRoleMapEntity } from '@modules/menu/entity';

console.log({
  test: 1,
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
