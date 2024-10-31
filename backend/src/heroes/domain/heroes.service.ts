import { Injectable } from '@nestjs/common';
import { CreateHeroInput } from './schemas/create-hero.interface';
import { HeroesRepository } from '../repository/heroes.repository';
import { Hero } from './entities/hero.entity';

@Injectable()
export class HeroesService {
  constructor(private readonly heroesRepository: HeroesRepository) {}
  async createHero(createHeroInput: CreateHeroInput): Promise<Hero> {
    return await this.heroesRepository.createHero(createHeroInput);
  }
}
