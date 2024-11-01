import { HeroImage } from '../domain/entities/hero-image.entity';

export class HeroImageMapper {
  static toDomain({ imageId, heroId, image }) {
    return new HeroImage(imageId, heroId, image);
  }
}
