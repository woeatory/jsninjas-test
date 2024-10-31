import { IsArray, IsString } from 'class-validator';

export class CreateHeroDto {
  @IsString()
  nickname: string;
  realName: string;
  originDescription: string;
  @IsArray()
  superPowers: string[];
  @IsString()
  catchPhrase: string;
}
