import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.NODE_PORT;
  const version = process.env.npm_package_version;

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('CinePik Catalog API')
    .setDescription('The CinePik Catalog microservice.')
    .setVersion(version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable DTO validation
  app.useGlobalPipes(new ValidationPipe());

  console.log(`App version ${version}`);
  console.log(`Listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
