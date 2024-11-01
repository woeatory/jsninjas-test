import { HeroImage } from '../domain/entities/hero-image.entity';
import { CreateHeroImage } from '../domain/schemas/create-hero-image.interface';

export abstract class HeroImageRepository {
  abstract addImage(data: CreateHeroImage): Promise<HeroImage>;
}
