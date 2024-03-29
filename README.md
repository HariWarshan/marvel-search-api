# Project Name - Marvel Search API

Follow the instructions below to set up the environment and run the application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Environment](#setup-environment)
- [Installation](#install-dependencies)
- [Database Migration](#migrate-the-database)
- [Database Seed](#optionally-seed-the-database)
- [Running the App](#start-the-application)

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Database Engine] (PostgreSQL)

## Setup Environment

1. Create a `.env` file in the root of the project.
2. Copy the below content and replace it in `.env`

```
NODE_APPLICATION_PORT = 3000
DB_HOST = <database server host>
DB_PORT = <database server port>
DB_USERNAME = <database server username>
DB_PASSWORD = <database server password>
DB_NAME = <database name>
PASSWORD_SALT_VALUE = <add random salt value for hashing the password>
ACCESS_TOKEN_SECRET_VALUE = <add random secret value>
MARVEL_API_PUBLIC_KEY = <your marvel API public key>
MARVEL_API_PRIVATE_KEY = <your marvel API private key>
```

## Install dependencies

`npm install`

# Migrate the database

`npm run migration:up`

# Optionally seed the database

`npm run seed`

# Start the application

*watch mode:*

`npm run dev`


*production mode:*

`npm run start`
