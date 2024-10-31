import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { HeroesService } from '../domain/heroes.service';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { HeroDto } from './dto/hero.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('heroes')
export class HeroesController {
  logger: Logger;
  constructor(private readonly heroesService: HeroesService) {
    this.logger = new Logger(HeroesController.name);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new hero',
    type: CreateHeroDto,
  })
  @ApiCreatedResponse({
    description: 'New hero was successfully created.',
    type: HeroDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @UseInterceptors(FileInterceptor('image'))
  async createHero(
    @Body() createHeroDto: CreateHeroDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const { nickname, realName, originDescription, superPowers, catchPhrase } =
      createHeroDto;
    try {
      return await this.heroesService.createHero(
        {
          nickname,
          realName,
          originDescription,
          superPowers,
          catchPhrase,
        },
        file.buffer,
      );
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        "Couldn't create a new hero",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiQuery({})
  async getHero() {}
}
