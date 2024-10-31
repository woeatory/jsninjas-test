import { Body, Controller, Post } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { HeroesService } from '../domain/heroes.service';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}
  @Post('create')
  async createHero(@Body() createHeroDto: CreateHeroDto) {
    const { nickname, realName, originDescription, superPowers, catchPhrase } =
      createHeroDto;

    return await this.heroesService.createHero({
      nickname,
      realName,
      originDescription,
      superPowers,
      catchPhrase,
    });
  }
}
