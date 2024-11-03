import { ApiProperty, PartialType } from '@nestjs/swagger';
import { HeroDto } from './hero.dto';
import { HeroImageDto } from './image.dto';

export class UpdateHeroDto extends PartialType(HeroDto) {
  @ApiProperty()
  deleteImagesIds?: number[];
  @ApiProperty()
  uploadImages?: [Omit<HeroImageDto, 'id'>];
}
