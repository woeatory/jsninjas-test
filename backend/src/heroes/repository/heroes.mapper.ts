import { Hero } from '../domain/entities/hero.entity';

interface PersistentHero {
  nickname: string;
  realName: string;
  originDescription: string;
  superPowers: string;
  catchPharse: string;
}

export class HeroesMapper {
  static toDomain(persistentHero: PersistentHero): Hero {
    return new Hero(
      persistentHero.nickname,
      persistentHero.realName,
      persistentHero.originDescription,
      persistentHero.superPowers.split(','),
      persistentHero.catchPharse,
    );
  }
}
