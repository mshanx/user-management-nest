import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ErrorHandler } from '../errors/centralized-handler';
import { NotFoundFilter } from '../errors/not-found-filter';

async function bootstrap() {
  const port = process.env.APP_DOCKER_PORT;

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new ErrorHandler(),
    new NotFoundFilter(),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  await app.listen(port).then(() => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

bootstrap();