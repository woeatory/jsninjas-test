import { Module } from '@nestjs/common';
import { HeroImageService } from '../domain/hero-image.service';
import { HeroImageRepository } from '../repository/hero-image.repository';
import { PgHeroImageRepository } from '../repository/pg.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    HeroImageService,
    {
      provide: HeroImageRepository,
      useClass: PgHeroImageRepository,
    },
  ],
  exports: [HeroImageService],
})
export class HeroImageModule {}
