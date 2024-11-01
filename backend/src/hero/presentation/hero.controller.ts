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
import { HeroService } from '../domain/hero.service';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { HeroDto } from './dto/hero.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('hero')
export class HeroController {
  logger: Logger;
  constructor(private readonly heroService: HeroService) {
    this.logger = new Logger(HeroController.name);
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
      return await this.heroService.createHero(
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
