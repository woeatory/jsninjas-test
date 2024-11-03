import { Pool } from 'pg';
import { HeroImageRepository } from './hero-image.repository';
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/config/configuration';
import { HeroImage } from '../domain/entities/hero-image.entity';

@Injectable()
export class PgHeroImageRepository
  extends HeroImageRepository
  implements OnModuleDestroy
{
  pool: Pool;
  logger: Logger;
  constructor(private readonly configService: ConfigService) {
    super();
    this.logger = new Logger(PgHeroImageRepository.name);
    const config = this.configService.get<DatabaseConfig>('database');
    this.pool = new Pool({
      connectionString: config.connectionString,
    });
  }
  async addImages(heroImages: HeroImage[]): Promise<number[]> {
    const client = await this.pool.connect();
    try {
      client.query('BEGIN');
      const images = heroImages.map((value) => value.image);
      const heroIds = heroImages.map((value) => value.heroId);
      const queryText = `
    INSERT INTO "HeroImage" ("heroId", "image")
    SELECT unnest($1::bigint[]), unnest($2::bytea[])
  `;
      const queryInsert = [heroIds, images];
      const { rows } = await client.query(queryText, queryInsert);
      const result = rows as number[];
      client.query('COMMIT');
      return result;
    } catch (error) {
      this.logger.error(error);
      client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getImages(heroId?: number): Promise<HeroImage[]> {
    const client = await this.pool.connect();
    try {
      const whereCondition = heroId ? `WHERE "heroId" in (${heroId})` : '';
      const queryText = `SELECT * FROM "HeroImage"` + whereCondition;
      const { rows } = await client.query(queryText);
      return rows as HeroImage[];
    } catch (error) {
      this.logger.error(error);
    } finally {
      client.release();
    }
  }

  async getPreviewImages(heroIds: number[]): Promise<HeroImage[]> {
    const client = await this.pool.connect();
    try {
      const queryText = `SELECT DISTINCT ON ("heroId") *
      FROM "HeroImage" WHERE ("heroId") in (${heroIds.join(', ')})
      ORDER BY "heroId", "id"`;
      const { rows } = await client.query(queryText);
      return rows as HeroImage[];
    } catch (error) {
      this.logger.error(error);
    } finally {
      client.release();
    }
  }

  async deleteImages(id: number[]): Promise<void> {
    const client = await this.pool.connect();

    try {
      const queryText = `DELETE FROM "HeroImage WHERE ("heroId) in (${id.join(', ')})`;
      await client.query(queryText);
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      client.release();
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
