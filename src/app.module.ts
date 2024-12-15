import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';

const configService = new ConfigService();

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [AppConfig, DatabaseConfig],
  }), TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      ...configService.get('database'),
    }),
    inject: [ConfigService],
  }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }








// import { Module } from '@nestjs/common';
// import { Teacher } from './teacher.entity';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// const configService = new ConfigService();

// @Module({
//   imports: [ConfigModule.forRoot({
//     isGlobal: true,
//     envFilePath: '.env',
//     cache: true,
//   }), TypeOrmModule.forRoot({
//     type: 'postgres',
//     host: configService.getOrThrow('DB_HOST'),
//     port: Number(configService.getOrThrow('DB_PORT')),
//     username: configService.getOrThrow('DB_USERNAME'),
//     password: configService.getOrThrow('DB_PASSWORD'),
//     database: configService.getOrThrow('DB_DATABASE'),
//     entities: [Teacher],
//     synchronize: false, // true for dev only
//     // migrations: ['dist/src/db/migrations/**'],
//   }),
//     AuthModule
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }
