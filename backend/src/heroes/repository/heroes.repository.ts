import { Hero } from '../domain/entities/hero.entity';
import { CreateHero } from '../domain/schemas/create-hero.interface';

export type CreateHeroPersistence = CreateHero;

export abstract class HeroesRepository {
  abstract createHero(data: CreateHeroPersistence): Promise<Hero>;
}
