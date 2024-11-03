import { Module } from '@nestjs/common';
import { HeroService } from '../domain/hero.service';
import { HeroController } from '../presentation/hero.controller';
import { HeroRepository } from '../repository/hero.repository';
import { PgRepository } from '../repository/pg.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    HeroService,
    {
      provide: HeroRepository,
      useClass: PgRepository,
    },
  ],
  controllers: [HeroController],
})
export class HeroModule {}
