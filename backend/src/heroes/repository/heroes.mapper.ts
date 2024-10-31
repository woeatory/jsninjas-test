import { Hero } from '../domain/entities/hero.entity';

export class Mapper {
  static toDomain({
    nickname,
    realName,
    originDescription,
    superPowers,
    catchPharse,
  }): Hero {
    return new Hero(
      nickname,
      realName,
      originDescription,
      superPowers.split(','),
      catchPharse,
    );
  }
}
