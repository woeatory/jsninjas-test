import { Module } from '@nestjs/common';
import { HeroService } from '../domain/hero.service';
import { HeroController } from '../presentation/hero.controller';
import { HeroRepository } from '../repository/hero.repository';
import { PgRepository } from '../repository/pg.repository';
import { ConfigModule } from '@nestjs/config';
import { HeroImageModule } from '../../hero-image/application/hero-image.module';

@Module({
  imports: [ConfigModule, HeroImageModule],
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
