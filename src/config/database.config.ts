import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // synchronize: process.env.NODE_ENV === 'development',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  // .js because this runs from dist/ folder
  entities: [`$(__dirname)/../**/*.entity.js`],
  migrations: [`$(__dirname)/../../db/migrations/*.js`],
  migrationsTableName: process.env.DB_MIGRATIONS_TABLE,
}));
