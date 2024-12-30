import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';

describe('UsersController (e2e)', () => {
    let app: INestApplication;

    const mockUsersRepo = {
        find: jest.fn(() => []),
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [UsersModule],
        })
            .overrideProvider(getRepositoryToken(User))
            .useValue(mockUsersRepo)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/users (GET)', () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect(200)
            .expect([]);
    });
});