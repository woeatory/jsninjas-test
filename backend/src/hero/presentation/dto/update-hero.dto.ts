import { PartialType } from '@nestjs/swagger';
import { HeroDto } from './hero.dto';
import { HeroImageDto } from './image.dto';

export class UpdateHeroDto extends PartialType(HeroDto) {
  deleteImagesIds?: number[];
  uploadImages?: Omit<HeroImageDto[], 'id'>;
}
