import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { HeroService } from '../domain/hero.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { HeroDto } from './dto/hero.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetHeroPagedListDto } from './dto/get-hero-paged-list.dto';
import { GetHeroListDto } from './dto/get-hero-list.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('hero')
export class HeroController {
  logger: Logger;
  constructor(private readonly heroService: HeroService) {
    this.logger = new Logger(HeroController.name);
  }

  @Post('create')
  @ApiBody({
    description: 'Create a new hero',
    type: CreateHeroDto,
  })
  @ApiCreatedResponse({
    description: 'New hero was successfully created.',
    type: Number,
  })
  @ApiInternalServerErrorResponse({
    description: "Couldn't create a new hero.",
  })
  @UseInterceptors(FileInterceptor('image'))
  async createHero(@Body() dto: CreateHeroDto) {
    try {
      return await this.heroService.createHero(dto);
    } catch (error) {
      throw (
        (new HttpException(
          "Couldn't create a new hero",
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        error)
      );
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: HeroDto })
  async getHeroDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.heroService.getHero(id);
  }

  @Get()
  @ApiOkResponse({ type: [GetHeroListDto] })
  async getHeroesList(@Query() query: GetHeroPagedListDto) {
    return await this.heroService.getHeroesPagedList(
      query.skipCount,
      query.maxCount,
    );
  }

  @Put()
  @ApiOkResponse({ type: Number })
  async updateHero(@Body() body: UpdateHeroDto) {
    return await this.heroService.updateHeroDetails(body);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Hero deleted.' })
  @ApiInternalServerErrorResponse({ description: "Couldn't delete a hero" })
  async deleteHero(@Query('id', ParseIntPipe) id: number) {
    try {
      await this.heroService.deleteHero(id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException("Couldn't delete a hero");
    }
  }
}
