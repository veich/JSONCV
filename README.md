# JSON CV
`Showcase your CV like a dev pro :)`

## Description

  The main idea behind this app is to allow developers to create and share their CV in JSON format.

  Swagger docs are the convenient "fontend" (`localhost:3300`) for this app because, aside from documenting, Swagger can also be used to make API calls. 

## Project setup

```bash
$ npm install
```

## Compile and run the project

- You need Docker installed on your system in order to create database using `db:build` command
- Open the app (in browser) - `localhost:3300`

```bash
# creates postgres DB (docker)
$ npm run db:build

# creates tables & default data
$ npm run migration:run

# starts the app
$ npm run start
```

## Reset database

In case you want to clear any changes you made while testing the app.

```bash
$ npm run db:re:build
```

## Run tests

On my TODO list :)

```bash
$ npm run test
```