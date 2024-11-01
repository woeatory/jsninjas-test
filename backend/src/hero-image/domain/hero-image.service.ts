import { Injectable, Logger } from '@nestjs/common';
import { HeroImageRepository } from '../repository/hero-image.repository';
import { CreateHeroImage } from './schemas/create-hero-image.interface';

@Injectable()
export class HeroImageService {
  logger: Logger;
  constructor(private readonly heroImageRepository: HeroImageRepository) {
    this.logger = new Logger(HeroImageService.name);
  }

  async addImage(data: CreateHeroImage) {
    return await this.heroImageRepository.addImage(data);
  }
}
