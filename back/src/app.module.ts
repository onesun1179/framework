import { CacheModule, Module, OnModuleInit } from '@nestjs/common';
import { resolve } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodeModule } from './code/code.module';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { RouteModule } from './route/route.module';

import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AppConfigService } from './app-config/app-config.service';
import { ConfigModule } from '@nestjs/config';
import { RouteService } from './route/route.service';
import { FrontComponentModule } from './front-component/front-component.module';
// const dropSchema = true;
const dropSchema = false;
@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
    }),
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production',
    // }),
    TypeOrmModule.forRoot({
      namingStrategy: new SnakeNamingStrategy(),
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'framework',
      autoLoadEntities: true,
      dropSchema,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    CodeModule,
    UserModule,
    MenuModule,
    RouteModule,
    MessageModule,
    AppConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoTransformHttpErrors: true,
      autoSchemaFile: resolve(process.cwd(), 'src', 'schema.gql'),
      definitions: {
        path: resolve(process.cwd(), 'src', 'graphql.ts'),
      },
      formatError: (e) => {
        delete e.extensions.exception;

        return e;
      },
    }),
    FrontComponentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private appConfigService: AppConfigService,
    private routeService: RouteService,
  ) {}

  async onModuleInit() {
    if (dropSchema) {
      await this.authService.whenDbInit();
      await this.userService.whenDbInit();
      await this.appConfigService.whenDbInit();
      await this.routeService.whenDbInit();
    }
  }
}
