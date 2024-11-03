import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { HeroDto } from './hero.dto';

export class CreateHeroDto extends OmitType(HeroDto, [
  'id',
  'images',
] as const) {
  @ApiPropertyOptional({
    description: 'List of images encoded to base64',
    format: 'binary',
    type: [String],
  })
  images: Uint8Array[];
}
