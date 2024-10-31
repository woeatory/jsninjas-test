import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateHeroDto {
  @ApiProperty({ description: 'Superhero nickname', example: 'Superman' })
  @IsString()
  nickname: string;

  @ApiProperty({ description: 'Real name', example: 'Clark Kent' })
  @IsString()
  realName: string;

  @ApiProperty({
    description: 'Description of character',
    example: 'he was born...',
  })
  @IsString()
  originDescription: string;

  @ApiProperty({
    description: 'List of superpowers',
    type: [String],
    example: [
      'solar energy absorption and healing factor',
      'solar flare and heat vision',
    ],
  })
  @IsArray()
  superPowers: string[];

  @ApiProperty({
    description: 'Catch phrase',
    example: "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
  })
  @IsString()
  catchPhrase: string;
}
