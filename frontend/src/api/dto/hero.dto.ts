import { ImageDto } from './image.dto';

export interface HeroDto {
  id: number;
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  images?: ImageDto[];
}
