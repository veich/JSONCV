import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from 'dotenv';
import { resolve } from 'path';

config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: parseInt(configService.get('DB_PORT'), 10),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    // synchronize: configService.get('nodenv') === 'development',
    synchronize: false,
    logging: configService.get('nodenv') === 'development',
    // .ts because this does not run from dist/ folder
    entities: [`$(__dirname)/../src/**/*.entity.ts`],
    // use resolve() because migrations folder is outside src/
    migrations: [resolve(__dirname, 'migrations/*.ts')],
    migrationsTableName: configService.get('DB_MIGRATIONS_TABLE'),
});
