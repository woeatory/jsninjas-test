import { ApiProperty, PickType } from '@nestjs/swagger';
import { HeroDto } from './hero.dto';

export class GetHeroListDto extends PickType(HeroDto, ['nickname', 'id']) {
  @ApiProperty({ description: 'Preview image' })
  image: Uint8Array;
}
