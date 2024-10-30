import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';

@Module({
  providers: [HeroesService],
  controllers: [HeroesController],
})
export class HeroesModule {}
