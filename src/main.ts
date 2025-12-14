import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AsanaExceptionFilter } from './filters/asana-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AsanaExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
