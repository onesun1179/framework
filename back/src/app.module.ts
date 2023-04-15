import { CacheModule, Module, OnModuleInit } from '@nestjs/common';
import { join, resolve } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import * as shell from 'shelljs';
import * as Joi from 'joi';

import { DataSource } from 'typeorm';

import { ServeStaticModule } from '@nestjs/serve-static';
import * as fs from 'fs';
import { LoggingPlugin } from '@common/plugin/LoggingPlugin';

import { Builder } from 'builder-pattern';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GqlErrorFilter } from '@common/filter/GqlErrorFilter';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthModule } from '@auth/auth.module';
import { RoleModule } from '@modules/role/role.module';
import { CodeModule } from '@modules/code/code.module';
import { UserModule } from '@modules/user/user.module';
import { RouteModule } from '@modules/route/route.module';
import { MenuModule } from '@modules/menu/menu.module';
import { MessageModule } from '@modules/message/message.module';
import { FrontComponentModule } from '@modules/front-component/front-component.module';
import { IconModule } from '@modules/icon/icon.module';
import { FileModule } from '@file/file.module';
import { QueryExceptionFilter } from '@common/filter/QueryExceptionFilter';
import { ValidationErrorFilter } from '@common/filter/ValidationErrorFilter';
import { IconEntity } from '@modules/icon/entity/icon.entity';
import { IconGroupEntity } from '@modules/icon/entity/icon-group.entity';
import { IconIconGroupMapEntity } from '@modules/icon/entity/icon-icon-group-map.entity';
import { AllFrontComponentEntity } from '@modules/front-component/entity/all-front-component.entity';
import { RoleEntity } from '@modules/role/entity/role.entity';
import { FrontComponentEntity } from '@modules/front-component/entity/front-component.entity';
import { RouteEntity } from '@modules/route/entity/route.entity';
import { RoleFrontComponentMapEntity } from '@modules/role/entity/role-front-component-map.entity';
import { UserEntity } from '@modules/user/entity/user.entity';
import { MenuEntity } from '@modules/menu/entity/menu.entity';
import { MenuRoleMapEntity } from '@modules/menu/entity/menu-role-map.entity';
import { MessageGroupEntity } from '@modules/message/entity/message-group.entity';
import { MessageEntity } from '@modules/message/entity/message.entity';

const initYn = false;

// const initYn = true;
@Module({
  controllers: [AppController],
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
      isCacheableValue(v) {
        console.log({ v });
        return true;
      },
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
    FileModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: false,
      autoSchemaFile: resolve(process.cwd(), 'src', 'schema.gql'),
      definitions: {
        path: resolve(process.cwd(), 'src', '..', '..', 'front', 'graphql.ts'),
      },
    }),
  ],
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
            IconGroupEntity.create({
              name: o.name,
              seqNo: o.seqNo,
            }),
          ),
        );

        await entityManager.save(
          icons.map((o) =>
            IconEntity.create({
              name: o.name,
              filePath: o.filePath,
              seqNo: o.seqNo,
            }),
          ),
        );

        await entityManager.save(
          icons.map((o) =>
            IconIconGroupMapEntity.create({
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
          AllFrontComponentEntity.create({
            id: 'Home',
          }),
          AllFrontComponentEntity.create({
            id: 'MenuManagement',
          }),
          AllFrontComponentEntity.create({
            id: 'FrameworkMenuManagement',
          }),
          AllFrontComponentEntity.create({
            id: 'FrameworkMessageManagement',
          }),
          RoleEntity.create({
            name: '최초 가입자',
            identifier: 'guest',
          }),
          RoleEntity.create({
            name: '개발자',
          }),
        ]);

        const [
          homeFC,
          menuManageFC,
          frameworkMenuManagementFC,
          frameworkMessageManagementFC,
        ] = await entityManager.save([
          FrontComponentEntity.create({
            id: 'home',
          }),
          FrontComponentEntity.create({
            id: 'menuManage',
          }),
          FrontComponentEntity.create({
            id: 'frameworkMenuManagement',
          }),
          FrontComponentEntity.create({
            id: 'frameworkMessageManagement',
          }),
        ]);

        await entityManager.save([
          Builder(AllFrontComponentEntity, {
            ...homeAFC,
            frontComponent: homeFC,
          }).build(),
          Builder(AllFrontComponentEntity, {
            ...menuManagementAFC,
            frontComponent: menuManageFC,
          }).build(),
          Builder(AllFrontComponentEntity, {
            ...frameworkMenuManagementAFC,
            frontComponent: frameworkMenuManagementFC,
          }).build(),
          Builder(AllFrontComponentEntity, {
            ...frameworkMessageManagementAFC,
            frontComponent: frameworkMessageManagementFC,
          }).build(),
        ]);

        const homeRoute = await entityManager.save(
          RouteEntity.create({
            path: '/',
            frontComponent: homeFC,
          }),
        );

        const manageRoute = await entityManager.save(
          RouteEntity.create({
            path: 'manage',
            parent: homeRoute,
          }),
        );

        const menuManageRoute = await entityManager.save(
          RouteEntity.create({
            path: 'menu',
            frontComponent: menuManageFC,
            parent: manageRoute,
          }),
        );

        const frameworkRoute = await entityManager.save(
          RouteEntity.create({
            path: 'framework',
            parent: homeRoute,
          }),
        );

        const frameworkMenuRoute = await entityManager.save(
          RouteEntity.create({
            path: 'menu',
            frontComponent: frameworkMenuManagementFC,
            parent: frameworkRoute,
          }),
        );

        const frameworkMessageRoute = await entityManager.save(
          RouteEntity.create({
            path: 'message',
            frontComponent: frameworkMessageManagementFC,
            parent: frameworkRoute,
          }),
        );

        await entityManager.save([
          RoleFrontComponentMapEntity.create({
            role: guest,
            frontComponent: homeFC,
            allFrontComponent: homeAFC,
          }),
          RoleFrontComponentMapEntity.create({
            role: developer,
            frontComponent: homeFC,
            allFrontComponent: homeAFC,
          }),
          RoleFrontComponentMapEntity.create({
            role: developer,
            frontComponent: menuManageFC,
            allFrontComponent: menuManagementAFC,
          }),
          RoleFrontComponentMapEntity.create({
            role: developer,
            frontComponent: frameworkMenuManagementFC,
            allFrontComponent: frameworkMenuManagementAFC,
          }),
          RoleFrontComponentMapEntity.create({
            role: developer,
            frontComponent: frameworkMessageManagementFC,
            allFrontComponent: frameworkMessageManagementAFC,
          }),
        ]);

        await entityManager.save([
          UserEntity.create({
            id: '102494101026679318764',
            role: developer,
          }),
          UserEntity.create({
            id: '107731247344180282964',
            role: developer,
          }),
          UserEntity.create({
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
          MenuEntity.create({
            name: '관리',
            route: manageRoute,
          }),
          MenuEntity.create({
            name: '권한별 메뉴 관리',
            route: menuManageRoute,
          }),
          MenuEntity.create({
            name: '프레임워크',
            route: frameworkRoute,
          }),
          MenuEntity.create({
            name: '메뉴 관리',
            route: frameworkMenuRoute,
          }),
          MenuEntity.create({
            name: '메세지 관리',
            route: frameworkMessageRoute,
          }),
        ]);

        const [
          devManageMenuMRM,
          devFrameworkMenuMRM,
          guestManageMenuMRM,
          guestFrameworkMenuMRM,
        ] = await entityManager.save([
          MenuRoleMapEntity.create({
            role: developer,
            menu: manageMenu,
            orderNo: 1,
          }),
          MenuRoleMapEntity.create({
            role: developer,
            menu: frameworkMenu,
            orderNo: 2,
          }),
          MenuRoleMapEntity.create({
            role: guest,
            menu: manageMenu,
            orderNo: 1,
          }),
          MenuRoleMapEntity.create({
            role: guest,
            menu: frameworkMenu,
            orderNo: 2,
          }),
        ]);

        await entityManager.save([
          MenuRoleMapEntity.create({
            role: developer,
            menu: menuManageMenu,
            parent: devManageMenuMRM,
            orderNo: 1,
          }),
          MenuRoleMapEntity.create({
            role: developer,
            menu: frameworkMenuManagementMenu,
            parent: devFrameworkMenuMRM,
            orderNo: 1,
          }),
          MenuRoleMapEntity.create({
            role: developer,
            menu: frameworkMessageManagementMenu,
            parent: devFrameworkMenuMRM,
            orderNo: 2,
          }),

          MenuRoleMapEntity.create({
            role: guest,
            menu: menuManageMenu,
            parent: guestManageMenuMRM,
            orderNo: 1,
          }),
          MenuRoleMapEntity.create({
            role: guest,
            menu: frameworkMenuManagementMenu,
            parent: guestFrameworkMenuMRM,
            orderNo: 1,
          }),
          MenuRoleMapEntity.create({
            role: guest,
            menu: frameworkMessageManagementMenu,
            parent: guestFrameworkMenuMRM,
            orderNo: 2,
          }),

          // MenuRoleMapEntity.create({
          //   role: developer,
          //   menu: menuManageMenu,
          //   parent: guestManageMenuMRM,
          //   orderNo: 1,
          // }),
          // MenuRoleMapEntity.create({
          //   role: developer,
          //   menu: frameworkMenuManagementMenu,
          //   parent: guestFrameworkMenuMRM,
          //   orderNo: 1,
          // }),
          // MenuRoleMapEntity.create({
          //   role: developer,
          //   menu: frameworkMessageManagementMenu,
          //   parent: guestFrameworkMenuMRM,
          //   orderNo: 2,
          // }),
        ]);

        const errorMG = await entityManager.save(
          MessageGroupEntity.create({
            name: '에러 메세지',
            code: 'E',
          }),
        );
        const primaryMG = await entityManager.save(
          MessageGroupEntity.create({
            name: '일반 메세지',
            code: 'P',
          }),
        );
        await entityManager.save([
          MessageEntity.create({
            group: primaryMG,
            code: '0000',
            text: '{{0}}',
            name: '일반',
          }),
          MessageEntity.create({
            group: errorMG,
            code: '0000',
            text: '실패',
            name: '실패',
          }),
          MessageEntity.create({
            group: errorMG,
            code: '0001',
            text: `SQL_FAIL({{0}})`,
            name: 'SQL FAIL',
          }),
          MessageEntity.create({
            group: errorMG,
            code: '0002',
            text: `존재하지 않는 값 입니다.`,
            name: 'NOT FOUNT VALUE',
          }),
        ]);
      });
    }
    shell.exec('npm run gql.cp');
  }
}
