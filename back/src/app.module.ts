import { CacheModule, Module, OnModuleInit } from '@nestjs/common';
import { join, resolve } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeModule } from '@modules/code/code.module';
import { UserModule } from '@modules/user/user.module';
import { MenuModule } from '@modules/menu/menu.module';
import { RouteModule } from '@modules/route/route.module';

import { RoleModule } from '@modules/role/role.module';
import { MessageModule } from '@modules/message/message.module';
import { ConfigModule } from '@nestjs/config';
import { IconModule } from '@modules/icon/icon.module';
import * as process from 'process';
import * as shell from 'shelljs';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { DataSource } from 'typeorm';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as fs from 'fs';
import { LoggingPlugin } from '@common/plugins/LoggingPlugin';
import { Route } from '@modules/route/dto/route';
import { User } from '@modules/user/models/user';
import { IconGroup } from '@modules/icon/model/icon-group';
import { Icon } from '@modules/icon/model/icon';
import { IconIconGroupMap } from '@modules/icon/model/icon-icon-group-map';
import { Menu } from '@modules/menu/model/menu';
import { MenuRoleMap } from '@modules/menu/model/menu-role-map';
import { MenuRoleMapTree } from '@modules/menu/model/menu-role-map-tree';
import { MessageGroup } from '@modules/message/entities/message-group';
import { Role } from '@modules/role/entities/role.entity';
import { AllFrontComponent } from '@modules/front-component/entities/all-front-component.entity';
import { FrontComponent } from '@modules/front-component/entities/front-component.entity';
import { Builder } from 'builder-pattern';
import { RoleFrontComponentMap } from '@modules/role/entities/role-front-component-map.entity';
import { FrontComponentModule } from '@modules/front-component/front-component.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GqlErrorFilter } from '@common/filters/GqlErrorFilter';
import { Message } from '@modules/message/entities/message';
import { QueryExceptionFilter } from '@common/filters/QueryExceptionFilter';
import { ValidationErrorFilter } from '@common/filters/ValidationErrorFilter';
import { ValidationPipe } from '@nestjs/common/pipes';

const initYn = false;
// const initYn = true;
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'resource'),
      exclude: ['/graphql', '/api/(.*)'],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production',
    // }),

    TypeOrmModule.forRoot({
      maxQueryExecutionTime: 60,
      namingStrategy: new SnakeNamingStrategy(),
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      dropSchema: initYn,
      synchronize: initYn,
      logging: !initYn,
      // entitySkipConstructor: true,
    }),
    AuthModule,
    RoleModule,
    CodeModule,
    UserModule,
    MenuModule,
    RouteModule,
    MessageModule,
    FrontComponentModule,
    IconModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: false,
      autoTransformHttpErrors: true,
      autoSchemaFile: resolve(process.cwd(), 'src', 'schema.gql'),
      definitions: {
        path: resolve(process.cwd(), 'src', '..', '..', 'front', 'graphql.ts'),
      },
    }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggingPlugin,
    {
      provide: APP_FILTER,
      useClass: QueryExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: GqlErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationErrorFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: GraphqlCacheInterceptor,
    // },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    if (initYn) {
      let iconGroupNames: Array<{
        seqNo: number;
        name: string;
      }> = [];
      await new Promise((resolve) => {
        fs.readdir(
          join(process.cwd(), 'resource', 'icon'),
          async (err, files) => {
            iconGroupNames = files.map((fileName, i) => ({
              seqNo: i + 1,
              name: fileName,
            }));
            resolve(true);
          },
        );
      });
      const icons: Array<{
        seqNo: number;
        filePath: string;
        name: string;
        groupSeqNo: number;
      }> = [];
      for await (const iconGroupName of iconGroupNames) {
        await new Promise((r) => {
          fs.readdir(
            join(process.cwd(), 'resource', 'icon', iconGroupName.name),
            async (err, files) => {
              files.forEach((o) => {
                icons.push({
                  name: o.split('.')[0],
                  groupSeqNo: iconGroupName.seqNo,
                  seqNo: icons.length + 1,
                  filePath: `/icon/${iconGroupName.name}/${o}`,
                });
              });
              r(true);
            },
          );
        });
      }

      await this.dataSource.transaction(async (entityManager) => {
        await entityManager.save(
          iconGroupNames.map((o) =>
            IconGroup.create({
              name: o.name,
              seqNo: o.seqNo,
            }),
          ),
        );

        await entityManager.save(
          icons.map((o) =>
            Icon.create({
              name: o.name,
              filePath: o.filePath,
              seqNo: o.seqNo,
            }),
          ),
        );

        await entityManager.save(
          icons.map((o) =>
            IconIconGroupMap.create({
              iconSeqNo: o.seqNo,
              iconGroupSeqNo: o.groupSeqNo,
            }),
          ),
        );

        const [
          homeAFC,
          menuManagementAFC,
          frameworkMenuManagementAFC,
          frameworkMessageManagementAFC,
          guest,
          developer,
        ] = await entityManager.save([
          AllFrontComponent.create({
            id: 'Home',
          }),
          AllFrontComponent.create({
            id: 'MenuManagement',
          }),
          AllFrontComponent.create({
            id: 'FrameworkMenuManagement',
          }),
          AllFrontComponent.create({
            id: 'FrameworkMessageManagement',
          }),
          Role.create({
            name: '최초 가입자',
            identifier: 'guest',
          }),
          Role.create({
            name: '개발자',
          }),
        ]);

        const [
          homeFC,
          menuManageFC,
          frameworkMenuManagementFC,
          frameworkMessageManagementFC,
        ] = await entityManager.save([
          FrontComponent.create({
            id: 'home',
          }),
          FrontComponent.create({
            id: 'menuManage',
          }),
          FrontComponent.create({
            id: 'frameworkMenuManagement',
          }),
          FrontComponent.create({
            id: 'frameworkMessageManagement',
          }),
        ]);

        await entityManager.save([
          Builder(AllFrontComponent, {
            ...homeAFC,
            frontComponent: homeFC,
          }).build(),
          Builder(AllFrontComponent, {
            ...menuManagementAFC,
            frontComponent: menuManageFC,
          }).build(),
          Builder(AllFrontComponent, {
            ...frameworkMenuManagementAFC,
            frontComponent: frameworkMenuManagementFC,
          }).build(),
          Builder(AllFrontComponent, {
            ...frameworkMessageManagementAFC,
            frontComponent: frameworkMessageManagementFC,
          }).build(),
        ]);

        const homeRoute = await entityManager.save(
          Route.create({
            path: '/',
            frontComponent: homeFC,
          }),
        );

        const manageRoute = await entityManager.save(
          Route.create({
            path: 'manage',
            parent: homeRoute,
          }),
        );

        const menuManageRoute = await entityManager.save(
          Route.create({
            path: 'menu',
            frontComponent: menuManageFC,
            parent: manageRoute,
          }),
        );

        const frameworkRoute = await entityManager.save(
          Route.create({
            path: 'framework',
            parent: homeRoute,
          }),
        );

        const frameworkMenuRoute = await entityManager.save(
          Route.create({
            path: 'menu',
            frontComponent: frameworkMenuManagementFC,
            parent: frameworkRoute,
          }),
        );

        const frameworkMessageRoute = await entityManager.save(
          Route.create({
            path: 'message',
            frontComponent: frameworkMessageManagementFC,
            parent: frameworkRoute,
          }),
        );

        await entityManager.save([
          RoleFrontComponentMap.create({
            role: guest,
            frontComponent: homeFC,
            allFrontComponent: homeAFC,
          }),
          RoleFrontComponentMap.create({
            role: developer,
            frontComponent: homeFC,
            allFrontComponent: homeAFC,
          }),
          RoleFrontComponentMap.create({
            role: developer,
            frontComponent: menuManageFC,
            allFrontComponent: menuManagementAFC,
          }),
          RoleFrontComponentMap.create({
            role: developer,
            frontComponent: frameworkMenuManagementFC,
            allFrontComponent: frameworkMenuManagementAFC,
          }),
          RoleFrontComponentMap.create({
            role: developer,
            frontComponent: frameworkMessageManagementFC,
            allFrontComponent: frameworkMessageManagementAFC,
          }),
        ]);

        await entityManager.save([
          User.create({
            id: '102494101026679318764',
            role: developer,
          }),
          User.create({
            id: '107731247344180282964',
            role: developer,
          }),
          User.create({
            id: '116029307585897477435',
            role: developer,
          }),
        ]);

        const [
          manageMenu,
          menuManageMenu,
          frameworkMenu,
          frameworkMenuManagementMenu,
          frameworkMessageManagementMenu,
        ] = await entityManager.save([
          Menu.create({
            name: '관리',
            route: manageRoute,
          }),
          Menu.create({
            name: '권한별 메뉴 관리',
            route: menuManageRoute,
          }),
          Menu.create({
            name: '프레임워크',
            route: frameworkRoute,
          }),
          Menu.create({
            name: '메뉴 관리',
            route: frameworkMenuRoute,
          }),
          Menu.create({
            name: '메세지 관리',
            route: frameworkMessageRoute,
          }),
        ]);

        const [
          manageMRM,
          menuManageMRM,
          frameworkMRM,
          frameworkMenuMRM,
          frameworkMessageMRM,
        ] = await entityManager.save([
          MenuRoleMap.create({
            role: developer,
            menu: manageMenu,
            orderNo: 1,
          }),
          MenuRoleMap.create({
            role: developer,
            menu: menuManageMenu,
            orderNo: 1,
          }),
          MenuRoleMap.create({
            role: developer,
            menu: frameworkMenu,
            orderNo: 2,
          }),
          MenuRoleMap.create({
            role: developer,
            menu: frameworkMenuManagementMenu,
            orderNo: 1,
          }),
          MenuRoleMap.create({
            role: developer,
            menu: frameworkMessageManagementMenu,
            orderNo: 2,
          }),
        ]);

        await entityManager.save([
          MenuRoleMapTree.create({
            parentMenuRoleMap: manageMRM,
            childMenuRoleMap: menuManageMRM,
          }),
          MenuRoleMapTree.create({
            parentMenuRoleMap: frameworkMRM,
            childMenuRoleMap: frameworkMenuMRM,
          }),
          MenuRoleMapTree.create({
            parentMenuRoleMap: frameworkMRM,
            childMenuRoleMap: frameworkMessageMRM,
          }),
        ]);

        const errorMG = await entityManager.save(
          MessageGroup.create({
            name: '에러 메세지',
            code: 'E',
          }),
        );
        const primaryMG = await entityManager.save(
          MessageGroup.create({
            name: '일반 메세지',
            code: 'P',
          }),
        );
        await entityManager.save([
          Message.create({
            group: primaryMG,
            code: '0000',
            text: '{{0}}',
            name: '일반',
          }),
          Message.create({
            group: errorMG,
            code: '0000',
            text: '실패',
            name: '실패',
          }),
          Message.create({
            group: errorMG,
            code: '0001',
            text: `SQL_FAIL({{0}})`,
            name: 'SQL FAIL',
          }),
        ]);
      });
    }
    shell.exec('npm run gql.cp');
  }
}
