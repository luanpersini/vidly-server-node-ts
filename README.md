# Vidly-Server-TS - Movie Rental Plataform

# Objectives

The main objective of this project is to convert an higly coupled server APP built using NodeJS-Javascript-Mongoose to an low coupled APP using NodeJS-Typescript-MongoDb, following SOLID, TDD and Clean Code principles. The idea is to deal with the challanges of the conversion, focusing on the tecnologies instead of the bussiness rules and solutions that the App will delivery.

The frontend can be fount at https://github.com/luanpersini/vidly-ts

**From:**

- NodeJS (higly coupled to express, mongoose and other libraries, few tests)
- Javascript (no types)
- Mongoose (higly coupled)

**To:**

- NodeJS (low coupled - using ports and adapters)
- Typescript (strongly typed)
- MongoDB (low coupled)

## Vidly

Vidly is a movie rent plataform where you can manage movies, customers, rents and genres. Authentication and authorization is present and all data is consumed from an external API, build in nodejs. The customers and rent


## DevTecnologies

- Eslint
- Husky
- Git Commit Msg Linter
- Jest

## Tests

- files .spec.ts: unit tests
- files .test.ts: integration tests

## What was archieve so far - challanges

So far, the only new challange was about the validation using {obj, schemas}, like joi and yup.

**Status**: unfinished. This project was interrupted because it imposed few challanges. Instead, gonna work on NestJS framework - https://github.com/luanpersini/vidly-server-nestjs-ts

**Archievements:**

- Made a validation interface that uses schemas and is instanciated inside the controller, allowing it to be replaced.

**Credits:**

The original app was build by Mosh. You can find his courses at: https://codewithmosh.com/