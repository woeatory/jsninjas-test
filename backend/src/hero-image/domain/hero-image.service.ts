import { Injectable, Logger } from '@nestjs/common';
import { HeroImageRepository } from '../repository/hero-image.repository';
import { HeroImage } from './entities/hero-image.entity';
import { CreateHeroImageDto } from 'src/hero/presentation/dto/create-image.dto';

@Injectable()
export class HeroImageService {
  logger: Logger;
  constructor(private readonly heroImageRepository: HeroImageRepository) {
    this.logger = new Logger(HeroImageService.name);
  }

  async addImages(heroId: number, data: CreateHeroImageDto) {
    const heroImages: HeroImage[] = [];
    data.images.map((value) => {
      heroImages.push(new HeroImage(-1, heroId, value));
    });
    return await this.heroImageRepository.addImages(heroImages);
  }

  async getImages(heroId: number) {
    return await this.heroImageRepository.getImages(heroId);
  }

  async getPreviews(heroIds: number[]) {
    return await this.heroImageRepository.getPreviewImages(heroIds);
  }

  async deleteImage(ids: number[]) {
    return await this.heroImageRepository.deleteImages(ids);
  }
}
