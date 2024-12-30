import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';

describe('UsersController (e2e)', () => {
    let app: INestApplication;

    const mockedUsers = [
        {
            id: 1,
            name: 'John',
            email: 'john@email.com',
            experiences: [{
                id: 1001,
                position: { id: 2001, positionName: 'FE Developer' },
                skills: [
                    { id: 3001, skillName: 'JavaScript' },
                    { id: 3002, skillName: 'HTML' },
                    { id: 3003, skillName: 'CSS' },
                ]
            }],
        },
        {
            id: 2,
            name: 'Mary',
            email: 'mary@email.com',
            experiences: [{
                id: 1002,
                position: { id: 2002, positionName: 'iOS Developer' },
                skills: [
                    { id: 3004, skillName: 'Objective-C' },
                    { id: 3005, skillName: 'Swift' },
                    { id: 3006, skillName: 'CSS' },
                ]
            }],
        },
    ];

    const mockUsersRepo = {
        find: jest.fn().mockResolvedValue(mockedUsers),
        findOne: jest.fn().mockImplementation((query) =>
            Promise.resolve(mockedUsers.find((user) => user.id === query.where.id))
        ),
        // create: jest.fn().mockImplementation((dto) => dto),
        // save: jest.fn().mockImplementation((user) =>
        //     Promise.resolve({ id: Date.now(), ...user })
        // ),
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
            // .expect(mockedUsers);
            .then((response) => {
                expect(response.body).toEqual(mockedUsers);
                expect(response.body[0].skills.sort()).toEqual(['JavaScript', 'HTML', 'CSS'].sort());
                expect(response.body[1].skills.sort()).toEqual(['Objective-C', 'Swift', 'CSS'].sort());
            });
    });

    it('/users/2 (GET)', () => {
        return request(app.getHttpServer())
            .get('/users/2')
            .expect(200)
            // .expect(mockedUsers);
            .then((response) => {
                expect(response.body).toEqual(mockedUsers[1]);
                expect(response.body.skills.sort()).toEqual(['Objective-C', 'Swift', 'CSS'].sort());
            });
    });
});