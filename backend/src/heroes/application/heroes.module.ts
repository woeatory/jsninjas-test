import { Module } from '@nestjs/common';
import { HeroesService } from '../domain/heroes.service';
import { HeroesController } from '../presentation/heroes.controller';
import { HeroesRepository } from '../repository/heroes.repository';
import { PgRepository } from '../repository/pg.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    HeroesService,
    {
      provide: HeroesRepository,
      useClass: PgRepository,
    },
  ],
  controllers: [HeroesController],
})
export class HeroesModule {}
