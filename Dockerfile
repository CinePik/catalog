## Stage 1: Build
FROM node:18-alpine as build
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build

## Stage 2: Run
FROM node:18-alpine
WORKDIR /app
# Copy built assets from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/tsconfig*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
# Expose the port the app runs on
EXPOSE ${PORT}

# Construct database URL, otherwise it is not interpolated correctly
# Command to run the application
CMD export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}?schema=${DB_SCHEMA}&sslmode=prefer" && npm run start:migrate:prod
