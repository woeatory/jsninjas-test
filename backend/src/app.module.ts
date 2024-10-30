import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HeroesModule } from './heroes/heroes.module';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), HeroesModule],
})
export class AppModule {}
