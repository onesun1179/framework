import { CacheModule, Module, OnModuleInit } from '@nestjs/common';
import { join, resolve } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { AppMetadataModule } from '@modules/app-metadata/app-metadata.module';
import { ConfigModule } from '@nestjs/config';
import { FrontComponentModule } from '@modules/front-component/front-component.module';
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

const initYn = false;
// const initYn = true;

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'resource'),
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
      logging: true,
    }),
    AuthModule,
    RoleModule,
    CodeModule,
    UserModule,
    MenuModule,
    RouteModule,
    MessageModule,
    AppMetadataModule,
    FrontComponentModule,
    IconModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoTransformHttpErrors: true,
      autoSchemaFile: resolve(process.cwd(), 'src', 'schema.gql'),
      definitions: {
        path: resolve(process.cwd(), 'src', '..', '..', 'front', 'graphql.ts'),
        enumsAsTypes: true,
      },
      formatError: (e) => {
        delete e.extensions.exception;

        return e;
      },
    }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggingPlugin],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    if (initYn) {
      let query = `
          INSERT INTO all_front_component(id)
          VALUES ('Home');

          INSERT INTO front_component_type(seq_no, name)
          VALUES (1, 'route');
          INSERT INTO front_component(id, front_component_type_seq_no, initial_front_component_id)
          VALUES ('home', 1, 'Home');

          UPDATE all_front_component
             SET front_component_id = 'home'
           WHERE id = 'Home';

          INSERT INTO route(seq_no, path, front_component_id)
          VALUES (1, '/', 'home');

          INSERT INTO role(seq_no, name, identifier)
          VALUES (1, '최초가입자', 'guest'),
                 (2, '개발자', NULL);

          INSERT INTO user(id, role_seq_no)
          VALUES ('102494101026679318764', 2);
          INSERT INTO user(id, role_seq_no)
          VALUES ('107731247344180282964', 2);
          

          INSERT INTO role_front_component_map(role_seq_no, front_component_id, all_front_component_id)
          VALUES (1, 'home', 'Home'),
                 (2, 'home', 'Home');
      `;
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

      query += `INSERT INTO icon_group(seq_no, name)
                VALUES`;

      iconGroupNames.forEach(({ name, seqNo }, i, array) => {
        query += `(${seqNo}, '${name}')${i + 1 === array.length ? ';' : ','}`;
      });
      query += `INSERT INTO icon(seq_no, name, file_path)
                VALUES`;
      icons.forEach(({ name, seqNo, groupSeqNo, filePath }, i, array) => {
        query += `(${seqNo}, '${name}', '${filePath}')${
          i + 1 === array.length ? ';' : ','
        }`;
      });

      query += `INSERT INTO icon_icon_group_map(icon_seq_no, icon_group_seq_no)
                VALUES`;
      icons.forEach(({ name, seqNo, groupSeqNo, filePath }, i, array) => {
        query += `(${seqNo}, ${groupSeqNo})${
          i + 1 === array.length ? ';' : ','
        }`;
      });

      query += `
          INSERT INTO menu(seq_no, name, icon_seq_no)
          VALUES (1, '관리', 3),
                 (2, '메뉴 관리', NULL);

          INSERT INTO menu_role_map(seq_no, role_seq_no, menu_seq_no, order_no)
          VALUES (1, 2, 1, 1),
                 (2, 2, 2, 1);

          INSERT INTO menu_role_map_tree(seq_no,child_menu_role_map_seq_no, parent_menu_role_map_seq_no)
          VALUES (2, 2, 1);
                  
      `;
      for await (const q of query.split(';')) {
        q.trim() && (await this.dataSource.query(q));
      }
    }
    shell.exec('npm run gql.cp');
  }
}
