import { Hero } from '../domain/entities/hero.entity';
import { CreateHeroInput } from '../domain/schemas/create-hero.interface';

export abstract class HeroesRepository {
  abstract createHero(createHeroInput: CreateHeroInput): Promise<Hero>;
}
