# Lanars API

A modular REST API built with NestJS and Sequelize

## Requirements

- Node.js ≥ 22.0.0
- PostgreSQL (local or via Docker)
- Docker (optional — for running PostgreSQL container)

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

## Environment Setup

✅ The `environments/.env.local` file is included. Edit it to update environment variables such as `DATABASE_USER`, `DATABASE_PASSWORD`, etc.

> ⚠️ **Warning**: If you use Docker for PostgreSQL, the default `environments/.env.local` is already configured for local Docker development.

## Docker (PostgreSQL only)

To run PostgreSQL using Docker:

```bash
npm run docker:build
```

This command starts a PostgreSQL container for local development.

## Running the Project

1) Run migrations:

```bash
npm run migration:run
```

2) Start the server locally:

```bash
npm run start:local
```

## Project Structure

```
src/
├── modules/              # Business logic modules (auth, user, etc.)
├── common/               # Decorators, filters, helpers, interceptors
├── config/               # Configuration files (app, auth, database)
environments/             # .env files for various environments
```

## API Documentation (Swagger)

After starting the project, Swagger is available at:

```
http://localhost:3000/docs
```