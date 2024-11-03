import { PickType } from '@nestjs/swagger';
import { CreateHeroDto } from './create-hero.dto';

export class CreateHeroImageDto extends PickType(CreateHeroDto, ['images']) {}
