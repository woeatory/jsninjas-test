import { HeroImage } from 'src/hero-image/domain/entities/hero-image.entity';

export class Hero {
  constructor(
    public id: number,
    public nickname: string,
    public realName: string,
    public originDescription: string,
    public superpowers: string,
    public catchPhrase: string,
    public images?: HeroImage[],
  ) {}
}
