<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

# CinePik Catalog

Node.js microservice for providing the tv catalog

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Prisma

If any changes are made to the schema.prisma file, run the following command to update the database.
I creates a migration, updates the database (also seeds?), and updates the Prisma client.

```bash
$ npm run prisma:migrate
```

If you only want to seed the database, run the following command.

```bash
$ npm run prisma:seed
```

To update the Prisma client run the following command.

```bash
$ npm run prisma:client
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
