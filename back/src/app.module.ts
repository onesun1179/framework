import { CacheModule, Module, OnModuleInit } from '@nestjs/common';
import { join, resolve } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import * as Joi from 'joi';
import * as shell from 'shelljs';

import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggingPlugin } from '@common/plugin/LoggingPlugin';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GqlErrorFilter } from '@common/filter/GqlErrorFilter';
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
import { ValidationPipe } from '@common/pipe/ValidationPipe';

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

    CodeModule,
    UserModule,
    MenuModule,
    RouteModule,
    MessageModule,
    FrontComponentModule,
    RoleModule,
    IconModule,
    FileModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: false,
      autoSchemaFile: resolve(process.cwd(), 'schema.graphql'),
      definitions: {
        path: resolve(
          process.cwd(),
          'src',
          '..',
          '..',
          'front',
          'src',
          'graphql-type.ts',
        ),
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
    // {
    //   provide: APP_FILTER,
    //   useClass: ValidationErrorFilter,
    // },
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
  async onModuleInit() {
    shell.exec('npm run gql.cp');
  }
}
