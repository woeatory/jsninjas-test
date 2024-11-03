import { ApiProperty } from '@nestjs/swagger';

export class HeroImageDto {
  @ApiProperty({ description: 'Image ID', type: Number })
  id: number;

  @ApiProperty({ description: 'Hero ID', type: Number })
  heroId: number;

  @ApiProperty({ description: 'Base64 encoded file', type: String })
  image: Uint8Array;
}
