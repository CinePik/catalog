<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://github.com/CinePik/catalog/actions/workflows/ci.yml" target="_blank">
    <img src="https://github.com/CinePik/catalog/actions/workflows/ci.yml/badge.svg" alt="Catalog CI Workflow Status" />
  </a>
  <a href="https://github.com/CinePik/catalog/actions/workflows/cd.yml" target="_blank">
    <img src="https://github.com/CinePik/catalog/actions/workflows/cd.yml/badge.svg" alt="Catalog CD Workflow Status" />
  </a>
</p>

# CinePik Catalog

Node.js microservice for providing the tv catalog

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Prisma

If any changes are made to the schema.prisma file, run the following command to update the database.
I creates a migration, updates the database (also seeds?), and updates the Prisma client.

```bash
npm run prisma:migrate:dev
```

If you only want to seed the database, run the following command.

```bash
npm run prisma:seed
```

To update the Prisma client run the following command.

```bash
npm run prisma:client
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Docker

To run the app in a docker container, run the following commands.

```bash
docker network create cinepik-network

docker run -d --name cinepik-catalog-db  --env-file .env --network cinepik-network -p 5432:5432 postgres:15.5-alpine

docker build -t cinepik-catalog .

docker run -d -t --env-file .env --network cinepik-network -p 8080:8080 cinepik-catalog
```

To manually upload the image to Docker Hub, run the following commands.

```bash
docker build -t cinepik-catalog .

docker tag cinepik-catalog:latest <dockerhub_username>/cinepik-catalog:latest

docker push <dockerhub_username>/cinepik-catalog:latest
```

### Docker Compose

You can also setup the database and application with docker-compose.

```bash
docker-compose up --build

docker-compose down
```
