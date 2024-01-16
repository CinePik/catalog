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

Node.js microservice for providing the tv catalog.

## Documentation

OpenAPI documentation available at [http://localhost:3001/api](http://localhost:3001/api).  
For accessing secured endpoints add your `access_token` provided to you at login to the `Authorization` header.

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
# Run the application
docker-compose up --build  app

docker-compose down
```

## Kubernetes deployment

### Setup configs

Create a Secret for the movies API environment variable in the deployment file.
Replace the value in the <> with the appropriate value. More info [here](https://rapidapi.com/elisbushaj2/api/movies-api14).

```bash
kubectl create secret generic nest-credentials --from-literal=MOVIES_RAPID_API_KEY=<REPLACE_ME>
```

### Apply changes

We can create the deployment and service.

```bash
kubectl apply -f k8s/cinepik-catalog.yml
kubectl apply -f k8s/cinepik-catalog-svc.yml
```

### Seed the database in Kubernetes

To manually seed the database in Kubernetes, run the following command, which create a Job that runs the seed script.

```bash
kubectl apply -f k8s/seed-job.yml
```

### Other useful commands

```bash
kubectl get pods
kubectl delete deployment cinepik-catalog-deployment
kubectl delete configmap <configmap name>
kubectl rollout restart deployment/cinepik-catalog-deployment
kubectl logs <pod-id>
kubectl describe secret <secret-name>
kubectl get secret <secret-name>
kubectl get service
kubectl describe pods
```
