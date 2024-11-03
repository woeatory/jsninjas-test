import { ConfigService } from '@nestjs/config';
import { HeroRepository } from './hero.repository';
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Pool, types } from 'pg';
import { DatabaseConfig } from 'src/config/configuration';
import { Hero } from '../domain/entities/hero.entity';
import { HeroImage } from '../domain/entities/hero-image.entity';

@Injectable()
export class PgRepository extends HeroRepository implements OnModuleDestroy {
  pool: Pool;
  logger: Logger;
  constructor(private readonly configService: ConfigService) {
    super();
    this.logger = new Logger(PgRepository.name);
    const config = this.configService.get<DatabaseConfig>('database');
    types.setTypeParser(20, (val) => parseInt(val, 10));
    this.pool = new Pool({
      connectionString: config.connectionString,
    });
  }
  async createHero(hero: Hero): Promise<number> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const createHeroQueryText = `INSERT INTO "Hero" ("nickname", "realName", "originDescription", "superpowers", "catchPhrase") VALUES ($1, $2, $3, $4, $5) RETURNING id`;
      const createHeroQueryValues = [
        hero.nickname,
        hero.realName,
        hero.originDescription,
        hero.superpowers,
        hero.catchPhrase,
      ];
      const { rows } = await client.query(
        createHeroQueryText,
        createHeroQueryValues,
      );
      const result = rows[0] as Hero;
      const id = result.id;
      const images = hero.images.map((value) => value.image);
      const addImageQueryTest = `
        INSERT INTO "HeroImage" ("heroId", "image")
        SELECT $1, unnest($2::bytea[])`;

      const addImageQueryValues = [id, images];
      await client.query(addImageQueryTest, addImageQueryValues);

      await client.query('COMMIT');
      return id;
    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error(error);
    } finally {
      client.release();
    }
  }

  async getHero(id: number): Promise<Hero> {
    const client = await this.pool.connect();
    try {
      const selectDetails = `SELECT * FROM "Hero" WHERE "id" = $1`;
      const deteilsResult = await client.query(selectDetails, [id]);
      const hero = deteilsResult.rows[0] as Hero;
      const selectImages = `SELECT "id", "image" FROM "HeroImage" WHERE "heroId" = $1`;
      const imagesResult = await client.query(selectImages, [id]);
      const images = imagesResult.rows as HeroImage[];
      hero.images = images;
      return hero;
    } catch (error) {
      this.logger.error(error);
    } finally {
      client.release();
    }
  }

  async getHeroeListPaged(skipCount: number, maxCount: number) {
    const client = await this.pool.connect();
    try {
      const queryText = `SELECT 
        h."id",
        h."nickname",
        hi."image" AS "firstImage"
    FROM 
        "Hero" h
    LEFT JOIN 
        "HeroImage" hi 
    ON 
        h."id" = hi."heroId"
    AND 
        hi."id" = (
            SELECT "id"
            FROM "HeroImage"
            WHERE "heroId" = h."id"
            ORDER BY "id" ASC
            LIMIT 1
        )
    ORDER BY 
        h."id" 
    LIMIT 
        $1 
    OFFSET 
        $2`;
      const heroes = (await client.query(queryText, [maxCount, skipCount]))
        .rows as Hero[];
      const totalCount = (await client.query('SELECT COUNT(*) FROM "Hero"'))
        .rows[0].count as number;
      return { totalCount, heroes };
    } catch (error) {
      this.logger.error(error);
    } finally {
      client.release();
    }
  }

  async updateHero(
    hero: Hero,
    deleteImagesIds: number[],
    addImages: HeroImage[],
  ): Promise<void> {
    const client = await this.pool.connect();
    try {
      const values = [];
      if (hero.nickname) values.push(`"nickname" = '${hero.nickname}'`);
      if (hero.realName) values.push(`"realName" = '${hero.realName}'`);
      if (hero.originDescription)
        values.push(`"originDescription" = '${hero.originDescription}'`);
      if (hero.superpowers)
        values.push(`"superpowers" = '${hero.superpowers}'`);
      if (hero.catchPhrase)
        values.push(`"catchPhrase" = '${hero.catchPhrase}'`);

      await client.query('BEGIN');
      if (values.length > 0) {
        const updateHeroQueryText = `UPDATE "Hero" SET ${values.join(', ')} WHERE "id" = ${hero.id} RETURNING id`;
        await client.query(updateHeroQueryText);
      }

      for (const image of hero.images) {
        const updateImageQueryText = `UPDATE "HeroImage" SET "image" = $1 WHERE "id" = $2`;
        const values = [image.image, image.id];
        await client.query(updateImageQueryText, values);
      }

      if (deleteImagesIds?.length > 0)
        await client.query(
          `DELETE FROM "HeroImage" WHERE ("heroId") in (${deleteImagesIds.join(', ')})`,
        );

      if (addImages?.length > 0) {
        const images = addImages.map((value) => value.image);
        const heroIds = addImages.map((value) => value.heroId);
        const addImagesQueryText = `
        INSERT INTO "HeroImage" ("heroId", "image")
        SELECT unnest($1::bigint[]), unnest($2::bytea[])`;
        const addImagesQueryValues = [heroIds, images];
        await client.query(addImagesQueryText, addImagesQueryValues);
      }
      await client.query('COMMIT');
    } catch (error) {
      this.logger.error(error);
      await client.query('ROLLBACK');
    } finally {
      client.release();
    }
  }

  async deleteHero(id: number): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const queryText = `DELETE FROM "Hero" WHERE id = ${id}`;
      await client.query(queryText);
      await client.query('COMMIT');
    } catch (error) {
      this.logger.error(error);
      await client.query('ROLLBACK');
    } finally {
      client.release();
    }
  }
  onModuleDestroy() {
    this.pool.end();
  }
}
