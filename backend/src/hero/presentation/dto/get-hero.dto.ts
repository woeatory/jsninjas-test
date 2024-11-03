import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class GetHeroDto {
  @ApiPropertyOptional({
    description: 'List of hero ids',
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    const array = Array.isArray(value) ? value : [value];
    return array.map((value) => parseInt(value));
  })
  @IsNumber({}, { each: true })
  ids?: number[];
}
