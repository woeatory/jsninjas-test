import { ConfigService } from '@nestjs/config';
import { CreateHeroInput } from '../domain/schemas/create-hero.interface';
import { HeroesRepository } from './heroes.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { DatabaseConfig } from 'src/config/configuration';
import { Hero } from '../domain/entities/hero.entity';
import { HeroesMapper } from './heroes.mapper';

@Injectable()
export class PgRepository extends HeroesRepository {
  pool: Pool;
  logger: Logger;
  constructor(private readonly configService: ConfigService) {
    super();
    this.logger = new Logger(PgRepository.name);
    const config = configService.get<DatabaseConfig>('database');
    this.pool = new Pool({
      connectionString: config.connectionString,
    });
  }
  async createHero(createHeroInput: CreateHeroInput): Promise<Hero> {
    const client = await this.pool.connect();
    try {
      client.query('BEGIN');
      const queryText = `INSERT INTO "Hero" ("nickname", "realName", "originDescription", "superPowers", "catchPhrase") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const queryInsert = [
        createHeroInput.nickname,
        createHeroInput.realName,
        createHeroInput.originDescription,
        createHeroInput.superPowers.join(),
        createHeroInput.catchPhrase,
      ];
      const { rows } = await client.query(queryText, queryInsert);
      await client.query('COMMIT');
      return HeroesMapper.toDomain(rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      this.logger.error(error);
    } finally {
      client.release();
    }
  }
}
