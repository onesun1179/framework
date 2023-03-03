import { CacheModule, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeModule } from './code/code.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entity/user.entity';
import { MenuModule } from './menu/menu.module';
import { PathModule } from './path/path.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { resolve } from 'path';
import { DEVELOPER_AUTH, INITIAL_AUTH_LIST } from './auth/auth.constant';
import { Builder } from 'builder-pattern';
import { MessageModule } from './message/message.module';
import { MessageGroupEntity } from './message/entity/messageGroup.entity';
import { MessageEntity } from './message/entity/message.entity';
import { PathEntity } from './path/entity/path.entity';
import { PathsByAuthsEntity } from './path/entity/pathsByAuths.entity';

// const dropSchema = true;
const dropSchema = false;
@Module({
  imports: [
    CacheModule.register(),
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production',
    // }),
    ConfigModule.forRoot(),
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
    PathModule,
    MessageModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoTransformHttpErrors: true,
      autoSchemaFile: resolve(process.cwd(), 'src', 'schema.gql'),
      definitions: {
        path: resolve(process.cwd(), 'src', 'graphql.ts'),
        outputAs: 'class',
      },
      formatError: (e) => {
        delete e.extensions.exception;

        return e;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    if (dropSchema) {
      await Promise.all([
        (async () => {
          const authList = await Promise.all(
            INITIAL_AUTH_LIST.map((o) => o.save()),
          );

          const devAuth = authList.find(
            (o) => o.identifier === DEVELOPER_AUTH.identifier,
          )!;

          await Builder(UserEntity, {
            id: '102494101026679318764',
            auth: devAuth,
          })
            .build()
            .save();

          const rootPath = await Builder(PathEntity, {
            path: '/',
            title: 'root',
            componentPath: './root',
          })
            .build()
            .save();

          await Builder(PathsByAuthsEntity, {
            path: rootPath,
            auth: devAuth,
          })
            .build()
            .save();
        })(),
        (async () => {
          const groupMsg = await Builder(MessageGroupEntity, {
            id: 'E',
            name: '에러메세지',
          })
            .build()
            .save();
          const a = await Builder(MessageEntity, {
            messageGroup: groupMsg,
            msg: '안녕2',
          })
            .build()
            .save();
        })(),
      ]);
    }
  }
}
