import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(`Listening on port ${process.env.NODE_PORT}`);
  await app.listen(process.env.PORT);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
}
bootstrap();
