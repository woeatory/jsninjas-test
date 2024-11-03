import { HeroImage } from '../domain/entities/hero-image.entity';
import { CreateHeroImage } from '../domain/schemas/create-hero-image.interface';
import { GetHeroImage } from '../domain/schemas/get-hero-image.interface';

export type CreateHeroImagePersistence = CreateHeroImage;
export type GetHeroImagePersistence = GetHeroImage;
export abstract class HeroImageRepository {
  abstract addImages(images: HeroImage[]): Promise<number[]>;
  abstract getImages(heroId?: number): Promise<HeroImage[]>;
  abstract getPreviewImages(heroIds: number[]): Promise<HeroImage[]>;
  abstract deleteImages(ids: number[]): Promise<void>;
}
