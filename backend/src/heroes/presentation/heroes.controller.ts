import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { HeroesService } from '../domain/heroes.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { CreateHeroResponseDto } from './dto/response.dto';

@Controller('heroes')
export class HeroesController {
  logger: Logger;
  constructor(private readonly heroesService: HeroesService) {
    this.logger = new Logger(HeroesController.name);
  }

  @Post('create')
  @ApiBody({ description: 'Create a new hero', type: [CreateHeroDto] })
  @ApiCreatedResponse({
    description: 'New hero was successfully created.',
    type: CreateHeroResponseDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async createHero(@Body() createHeroDto: CreateHeroDto) {
    const { nickname, realName, originDescription, superPowers, catchPhrase } =
      createHeroDto;

    try {
      return await this.heroesService.createHero({
        nickname,
        realName,
        originDescription,
        superPowers,
        catchPhrase,
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't create a new hero",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
