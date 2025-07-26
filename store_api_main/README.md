Port number for db and server.
Environment variables.
Package installation instructions.
Setup db and server instructions.
Database schema with column name and type.
Endpoints such as GET /users.

### Prerequisites

- [Node.js](https://nodejs.org/) (v24.3.0)
- [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Clone the project

git clone https://github.com/Ghaidaa11/store_api_main.git
cd store_api_main

## 🌐 Environment Variables

Create a `.env` file in the root of the project and define the following:

## Environment Variables

Before running the project, copy the example environment file:

```bash
cp .env.example .env
```

## Database

Ensure PostgreSQL is installed and running. Create a new database:
CREATE DATABASE store_dev;
CREATE DATABASE store_test;



# Database schema
store_dev=# \dt
             List of relations
 Schema |      Name      | Type  |
--------+----------------+-------+
 public | migrations     | table | 
 public | order_products | table | 
 public | orders         | table | 
 public | products       | table | 
 public | users          | table | 
(5 rows)



## 📦 Installation
# Install all dependencies using Yarn
yarn install


# Run Migrations
yarn db-migrate up

## ▶️ Usage
yarn watch

## To run test 
yarn test



