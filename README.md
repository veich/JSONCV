# JSON CV
`Showcase your CV like a dev pro :)`

## Description

  The main idea behind this app is to allow developers to create and share their CV in JSON format.

## @Luiz

  I didn't have prior experience with Nest and TypeORM specifically (only Express and Sequelize) so I created this app to get up to speed.

## Project setup

```bash
$ npm install
```

## Compile and run the project

- You need Docker installed on your system in order to run `db:build` command
- Migrations run automatically on `start`

```bash
$ npm run db:build
$ npm run start
```

## Reset database

In case you want to clear any changes you made while testing the app.

```bash
$ npm run db:re:build
```

## Run tests

I have a good test coverage so feel free to run this as well.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```