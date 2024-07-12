# Nest Backend Application
Welcome to the Nest repository. 

## Prerequisites
Make sure you have the following requirements installed before getting started:

- `Node.js` (version `^20.15` | `^18.10`)
- `pnpm` (version `^9.0`)

> [!NOTE]
> To use `pnpm`, simply run the `corepack enable` command (make sure to have `Node.js` installed beforehand). Refer to [here](https://pnpm.io/installation#using-corepack) for more information.

## Technologies Used
 - __Framework:__ Nest JS (version `^10.0`)
 - __Database:__ Postgres (version `^16.0`)

## Steps to Run the Server
### 1. Initialize Environment Variables
Make a copy of the `.env.example` file in the current directory and rename it to `.env`. 

```bash
cp .env.example .env
```

This file initializes environment variables containing configurations needed to start the application. These variables are as follows:

  - `PORT`: The port on which the server listens for connections
  - `CORS_ALLOWED_ORIGINS`: A list of allowed origins for CORS request
  - `DB_USER`: The username to connect to the database 
  - `DB_PASSWORD`: The password to connect to the database 
  - `DB_HOST`: The address of the host where the database is located
  - `DB_PORT`: The port on which the database server is listening
  - `DB_NAME`: The name of the database to connect
  - `DATABASE_URL`: The connection URL for Prisma ORM
  - `JWT_SECRET`: The secret key used to sign and verify JWT 
  - `NODE_ENV`: The environment in which the application is running 

### 2. Start the Postgres Engine
Check if [Postgres](https://www.postgresql.org/) is installed. If not, you can easily create it with [Docker](https://www.docker.com/) by running the command:

```bash
docker compose up -d
```

> [!NOTE]
> Make sure Docker is installed to run the `docker compose up -d` command.


### 3. Install Dependencies
Install project dependencies by running the following command:

```bash
pnpm install
```

### 4. Migrate Schemas to the Database
Create the database and automatically insert test data by running the following command:
```bash
pnpm db:migrate:dev
```

> [!IMPORTANT]
> - Ensure that the database connection string is correctly set in the `DATABASE_URL` variable in the `.env` file.
> - If test data is not inserted automatically, run the `pnpm db:seed` command to insert it manually.

### 5. Start the Backend Application
Run the server in **development mode**
```bash
pnpm start:dev
```

Run the server in **production mode**
```bash
pnpm start:prod
```