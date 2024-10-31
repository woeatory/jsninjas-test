import { Injectable } from '@nestjs/common';
import { CreateHeroInput } from './schemas/create-hero.interface';
import { HeroesRepository } from '../repository/heroes.repository';

@Injectable()
export class HeroesService {
  constructor(private readonly heroesRepository: HeroesRepository) {}
  async createHero(createHeroInput: CreateHeroInput) {
    return await this.heroesRepository.createHero(createHeroInput);
  }
}
