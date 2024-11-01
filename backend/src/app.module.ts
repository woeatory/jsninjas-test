import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HeroModule as HeroModule } from './hero/application/hero.module';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), HeroModule],
})
export class AppModule {}
