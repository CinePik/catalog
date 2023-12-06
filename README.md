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

docker run -d -t --env-file .env --network cinepik-network -p 3001:3001 cinepik-catalog
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
# Run the database and application
docker-compose up --build db app
# Trigger database seeding
docker-compose up --build seed

docker-compose down
```

## Kubernetes

Before hand we must create a ConfigMap and Secret for the environment variables in the deployment file. These environment variables are used to construct the database connection string.
Replace the values in the <> with the appropriate values.

```bash
# ConfigMap
kubectl create configmap database-config \
  --from-literal=DB_HOST=<db_host> \
  --from-literal=DB_PORT=<db_port> \
  --from-literal=DB_SCHEMA=<db_schema>

# Secret
kubectl create secret generic database-credentials \
  --from-literal=POSTGRES_USER=<username> \
  --from-literal=POSTGRES_PASSWORD=<password> \
  --from-literal=POSTGRES_DB=<db_name>
```

For authorization purposes we also need to define:

- a ConfigMap named auth-config with the following keys: KEYCLOAK_BASE_URL, KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID
- a Secret named auth-credentials with the following keys: KEYCLOAK_CLIENT_SECRET

Then we can create the deployment and service.

```bash
kubectl apply -f k8s/cinepik-catalog.yml
```

### Seed the database in Kubernetes

To manually seed the database in Kubernetes, run the following command, which create a Job that runs the seed script.

```bash
kubectl apply -f k8s/seed-job.yml
```
