import { HeroImage } from 'src/hero-image/domain/entities/hero-image.entity';
import { Hero } from '../domain/entities/hero.entity';

export abstract class HeroRepository {
  abstract createHero(data: Hero): Promise<number>;
  abstract getHero(id: number): Promise<Hero>;
  abstract getHeroeListPaged(
    skipCount: number,
    maxCount: number,
  ): Promise<Hero[]>;
  abstract updateHero(
    data: Hero,
    deleteImagesIds: number[],
    addImages: HeroImage[],
  ): Promise<number>;
  abstract deleteHero(id: number): Promise<void>;
}
