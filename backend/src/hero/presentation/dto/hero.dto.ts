import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { HeroImageDto } from './image.dto';

export class HeroDto {
  @ApiProperty({ description: 'Hero ID' })
  id: number;

  @ApiProperty({
    description: 'Superhero nickname',
    example: 'Superman',
  })
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
    example:
      'solar energy absorption and healing factor, solar flare and heat vision',
  })
  @IsString()
  superpowers: string;

  @ApiProperty({
    description: 'Catch phrase',
    example: "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
  })
  @IsString()
  catchPhrase: string;

  @ApiProperty({
    description: 'Images',
    format: 'binary',
    type: [HeroImageDto],
  })
  images: HeroImageDto[];
}
