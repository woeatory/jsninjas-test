import { Injectable } from '@nestjs/common';
import { HeroRepository as HeroRepositry } from '../repository/hero.repository';
import { Hero } from './entities/hero.entity';
import { CreateHeroDto } from '../presentation/dto/create-hero.dto';
import { UpdateHeroDto } from '../presentation/dto/update-hero.dto';
import { HeroImage } from './entities/hero-image.entity';
@Injectable()
export class HeroService {
  constructor(private readonly heroRepository: HeroRepositry) {}
  async createHero(data: CreateHeroDto): Promise<number> {
    const images: HeroImage[] = [];
    data.images.forEach((image) => images.push(new HeroImage(-1, -1, image)));
    const id = await this.heroRepository.createHero(
      new Hero(
        -1,
        data.nickname,
        data.realName,
        data.originDescription,
        data.superpowers,
        data.catchPhrase,
        images,
      ),
    );
    return id;
  }

  async getHero(id: number): Promise<Hero> {
    const hero = await this.heroRepository.getHero(id);
    return hero;
  }

  async getHeroesPagedList(skipCount: number, maxCount: number) {
    const heroes = await this.heroRepository.getHeroeListPaged(
      skipCount,
      maxCount,
    );
    return heroes;
  }

  async updateHeroDetails(update: UpdateHeroDto) {
    const heroImages: HeroImage[] = [];
    update.images.forEach((image) =>
      heroImages.push(new HeroImage(image.id, image.heroId, image.image)),
    );
    const hero = new Hero(
      update.id,
      update.nickname,
      update.realName,
      update.originDescription,
      update.superpowers,
      update.catchPhrase,
      heroImages,
    );
    const newImages: HeroImage[] = [];
    update.uploadImages.map((image) =>
      newImages.push(new HeroImage(-1, image.heroId, image.image)),
    );
    return await this.heroRepository.updateHero(
      hero,
      update.deleteImagesIds,
      update.uploadImages,
    );
  }

  async deleteHero(id: number) {
    return await this.heroRepository.deleteHero(id);
  }
}
