import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetHeroPagedListDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  skipCount: number;
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  maxCount: number;
}
