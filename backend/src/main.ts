import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppConfig } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger: Logger = new Logger('BOOTSTRAP');
  const { port } = configService.get<AppConfig>('app');

  await app.listen(port, () => {
    logger.log(`App listening on port ${port}`);
  });
}
bootstrap();
