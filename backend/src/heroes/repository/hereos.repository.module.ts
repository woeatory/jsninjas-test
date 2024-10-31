// import { Module } from '@nestjs/common';
// import { HeroesRepository } from './heroes.repository';
// import { PgRepository } from './pg.repository';
// import { ConfigModule } from '@nestjs/config';

// @Module({
//   imports: [ConfigModule],
//   providers: [
//     {
//       provide: HeroesRepository,
//       useClass: PgRepository,
//     },
//   ],
//   exports: [HeroesRepository],
// })
// export class HeroesRepositoryModule {}
