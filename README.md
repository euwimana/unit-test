# LnL - Testing & Test Driven Development

## 1. Description

TDD & BDD demonstation using a simple mining project.

### 1.1. API

Description | Method | Endpoint | Data | Response
--- | --- | --- | --- | ---
Create a new registry entry | POST | `/registry` | { payload: String } | 201 (Created) => { id: String, payload: String, hash: String, createdAt: Date } <br /> 400 (Bad Request) => { message: String, description: { field: String, message: String } }
Read existing registry entry | GET | `/registry/:id` | None | 200 (OK) => { id: String, payload: String, hash: String, createdAt: Date } <br /> 404 (Not Found) => { message: String, description: { field: String, message: String } }
Request for mining | POST | `/mine` | { endTime: Date } | 201 (Created) => { endTime: Date, nonce: Number, hash: String, createdAt: Date } <br /> 400 (Bad Request) => { message: String, description: { field: String, message: String } } <br /> 410 (Gone) => { message: String, description: { field: String, message: String } } <br /> 425 (Too Early) => { message: String, description: { field: String, message: String } }

### 1.2. Models

### Registry

Field | Datatype | Nulable | Default | Constraint
--- | --- | --- | --- | ---
id | UUID | NO | NULL | PRIMARY
payload | TEXT | NO | NULL | 
hash | CHAR(64) | NO | NULL | 
createdAt | TIMESTAMP | NO | NOW() | 
updatedAt | TIMESTAMP | NO | NOW() | 

### Blockchain

Field | Datatype | Nulable | Default | Constraint
--- | --- | --- | --- | ---
endTime | TIMESTAMP | NO | NULL | 
nonce | NUMBER | NO | NULL | 
hash | CHAR(64) | NO | NULL | PRIMARY
createdAt | TIMESTAMP | NO | NOW() | 
updatedAt | TIMESTAMP | NO | NOW() | 

### 1.3. Mining process
- Each registry entry must have a hash that corresponds to its payload
- Each blockchain entry must have a hash that corresponds to 10+ last registry entry plus last blockchain entry and nonce (∑(entries) + Last Hash + Nonce)
  - The resulting hash must end with a predefined number of zeros
  - New hash should start from endTime (excluded)

## 2. INIT Project
Initialized project and installed basic packages:
- config
- express
- pg
- sequelize

## 3. TDD
Added testing packages:
- chai
- chai-as-promised
- @faker-js/faker
- mocha
- nyc
- sinon

Tasks

- Creating HashString
- Creating Register
- Creating Blockchain

## 4. BDD
Added additional testing packages:
- supertest

Tasks

- Creating `POST /registry`
- Creating `GET /registry:id`
- Creating `POST /mine`
