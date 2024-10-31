import { Injectable } from '@nestjs/common';
import { CreateHero } from './schemas/create-hero.interface';
import { HeroesRepository } from '../repository/heroes.repository';
import { Hero } from './entities/hero.entity';
import { HeroImageService } from 'src/heroes-image/domain/hero-image.service';

@Injectable()
export class HeroesService {
  constructor(
    private readonly heroesRepository: HeroesRepository,
    private readonly heroImageService: HeroImageService,
  ) {}
  async createHero(data: CreateHero, image: Buffer): Promise<Hero> {
    const hero = await this.heroesRepository.createHero(data);
    await this.heroImageService.addImage({ heroId: hero.heroId, image });
    return hero;
  }
}
