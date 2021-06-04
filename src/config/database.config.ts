import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default () =>
  ({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      join(__dirname, '..', 'database', 'entities', '*.entity{.js,.ts}'),
    ],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    dropSchema: process.env.DB_DROP_SCHEMA === 'true',
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
    namingStrategy: new SnakeNamingStrategy(),
  } as TypeOrmModuleOptions);
