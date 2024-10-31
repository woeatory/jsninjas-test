import { OmitType } from '@nestjs/swagger';
import { HeroDto } from './hero.dto';

export class CreateHeroDto extends OmitType(HeroDto, ['heroId'] as const) {}
