import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfig } from './config/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger: Logger = new Logger('BOOTSTRAP');

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Heroes API')
    .setDescription('The heroes API description')
    .setVersion('1.0')
    .addTag('heroes')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);
  const { port } = configService.get<AppConfig>('app');

  await app.listen(port, () => {
    logger.log(`App listening on port ${port}`);
  });
}
bootstrap();
