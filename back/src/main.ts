import { NestFactory } from '@nestjs/core';

import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
    cors: true,
  });

  // const config = new DocumentBuilder()
  //   .setTitle('Cats example')
  //   .setDescription('The cats API description')
  //   .setVersion('1.0')
  //   .addTag('cats')
  //   .build();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'resource'));
  // app.useGlobalFilters(new GqlErrorFilter());
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');

  // const reflector = app.get(Reflector);
  // app.useGlobalGuards(new GqlAuthGuard(reflector));
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);

  app.use(cookieParser());

  await app.listen(process.env.PORT!);
}

bootstrap();
