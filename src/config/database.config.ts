import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [`$(__dirname)/../**/*.entity{.ts,.js}`],
    // synchronize: process.env.NODE_ENV === 'development',
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    migrations: [`$(__dirname)/../../db/migrations/*{.ts,.js}`],
    migrationsTableName: process.env.DB_MIGRATIONS_TABLE,
}));
