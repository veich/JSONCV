import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: parseInt(configService.get('DB_PORT'), 10),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [`$(__dirname)/../src/**/*.entity{.ts,.js}`],
    // synchronize: configService.get('nodenv') === 'development',
    synchronize: true,
    logging: configService.get('nodenv') === 'development',
    migrations: [`$(__dirname)/migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations',
});
