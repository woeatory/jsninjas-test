import { ApiProperty, PickType } from '@nestjs/swagger';
import { HeroDto } from './hero.dto';

export class GetHeroListDto extends PickType(HeroDto, [
  'nickname',
  'id',
] as const) {
  @ApiProperty({ description: 'Preview image', format: 'binary', type: String })
  image: Uint8Array;
  @ApiProperty({ description: 'List of images ids' })
  imagesIds: number[];
}
