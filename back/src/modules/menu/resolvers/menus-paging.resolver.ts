import { Resolver } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { MenuService } from '../menu.service';
import { GqlAuthGuard } from '../../../auth/guard/gql-auth.guard';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Menus } from '@modules/menu/model/dto/menus';

@UseGuards(GqlAuthGuard)
@Resolver(() => Menus)
export class MenusPagingResolver {
  constructor(
    private readonly menuService: MenuService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  private readonly logger = new Logger(MenusPagingResolver.name);
}
