import { ApiProperty } from '@nestjs/swagger';
import { GetHeroListDto } from './get-hero-list.dto';

export class PagedHeroListResultDto {
  heroes: GetHeroListDto[];
  @ApiProperty({ description: 'Total heroes count' })
  totalCount: number;
}
