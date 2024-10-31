import { Pool } from 'pg';
import { CreateHeroImage } from '../domain/schemas/create-hero-image.interface';
import { HeroImageRepository } from './hero-image.repository';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/config/configuration';
import { HeroImageMapper } from './hero-image.mapper';

@Injectable()
export class PgHeroImageRepository extends HeroImageRepository {
  pool: Pool;
  logger: Logger;
  constructor(private readonly configService: ConfigService) {
    super();
    this.logger = new Logger(PgHeroImageRepository.name);
    const config = configService.get<DatabaseConfig>('database');
    this.pool = new Pool({
      connectionString: config.connectionString,
    });
  }
  async addImage(data: CreateHeroImage) {
    const client = await this.pool.connect();
    try {
      client.query('BEGIN');
      const queryText = `INSERT INTO "HeroImage" ("heroId", "image") VALUES ($1, $2) RETURNING *`;
      const queryInsert = [data.heroId, data.image];
      const { rows } = await client.query(queryText, queryInsert);
      client.query('COMMIT');
      return HeroImageMapper.toDomain(rows[0]);
    } catch (error) {
      this.logger.error(error);
      client.query('ROLLBACK');
    } finally {
      client.release();
    }
  }
}
