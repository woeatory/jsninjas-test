import { ConfigService } from '@nestjs/config';
import { CreateHeroPersistence, HeroRepository } from './hero.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { DatabaseConfig } from 'src/config/configuration';
import { Hero } from '../domain/entities/hero.entity';
import { HeroMapper } from './hero.mapper';

@Injectable()
export class PgRepository extends HeroRepository {
  pool: Pool;
  logger: Logger;
  constructor(private readonly configService: ConfigService) {
    super();
    this.logger = new Logger(PgRepository.name);
    const config = this.configService.get<DatabaseConfig>('database');
    this.pool = new Pool({
      connectionString: config.connectionString,
    });
  }
  async createHero(data: CreateHeroPersistence): Promise<Hero> {
    const client = await this.pool.connect();
    try {
      client.query('BEGIN');
      const queryText = `INSERT INTO "Hero" ("nickname", "realName", "originDescription", "superPowers", "catchPhrase") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const queryInsert = [
        data.nickname,
        data.realName,
        data.originDescription,
        data.superPowers,
        data.catchPhrase,
      ];
      const { rows } = await client.query(queryText, queryInsert);
      await client.query('COMMIT');
      return HeroMapper.toDomain(rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error(error);
    } finally {
      client.release();
    }
  }
}
