import { HeroListResultDto } from '../dto/hero-preview.dto';
import { HeroDto } from '../dto/hero.dto';

export class HeroService {
  async getHeroList(
    skipCount: number,
    maxCount: number,
  ): Promise<HeroListResultDto> {
    const params = { skipCount, maxCount };
    // @ts-ignore
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:8000/hero?${queryString}`);
    const heroes = (await response.json()) as HeroListResultDto;
    return heroes;
  }

  async getHeroDetails(id: number): Promise<HeroDto> {
    const response = await fetch(`http://localhost:8000/hero/${id}`);
    const hero = (await response.json()) as HeroDto;
    return hero;
  }
}
