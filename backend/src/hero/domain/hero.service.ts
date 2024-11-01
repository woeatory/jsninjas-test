import { Injectable } from '@nestjs/common';
import { CreateHero } from './schemas/create-hero.interface';
import { HeroRepository as HeroRepositry } from '../repository/hero.repository';
import { Hero } from './entities/hero.entity';
import { HeroImageService } from '../../hero-image/domain/hero-image.service';

@Injectable()
export class HeroService {
  constructor(
    private readonly heroRepository: HeroRepositry,
    private readonly heroImageService: HeroImageService,
  ) {}
  async createHero(data: CreateHero, image: Buffer): Promise<Hero> {
    const hero = await this.heroRepository.createHero(data);
    await this.heroImageService.addImage({ heroId: hero.heroId, image });
    return hero;
  }
}
