## Description

This repository is built with [Nest](https://github.com/nestjs/nest) framework.

## Purpose

The purpose of this repository is for Salary Hero interview only.

## Requirement

- Docker
- Docker Compose
- NodeJS

## Running the app

Run this command at project root directory

```bash
docker-compose up -d --build
```

with this command Postgresql database will be created at [http://localhost:5432]() and app will be running at [http://localhost:3000](http://localhost:3000) also SwaggerUI will be running at [http://localhost:3000/docs](http://localhost:3000/docs).

After run the command, The application will automatically create default user which has HERO role.

default user credetial

```
{
  "username": "salary-hero",
  "password": "P@ssw0rd"
}
```

## API List

| API                                            | HTTP Method | Role         | Description                                                                                                      |
| ---------------------------------------------- | ----------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `/auth/signIn`                                 | POST        | anyone       | Sign in to the application                                                                                       |
| `/companies`                                   | POST        | HERO         | Create a company                                                                                                 |
| `/companies`                                   | GET         | HERO         | Find all companies                                                                                               |
| `/companies/search`                            | GET         | HERO         | Search companies by name                                                                                         |
| `/companies/{id}`                              | GET         | HERO         | Find a company by id                                                                                             |
| `/companies/{id}`                              | PATCH       | HERO         | Update a company                                                                                                 |
| `/companies/{id}`                              | DELETE      | HERO         | Delete a company                                                                                                 |
| `/employees/requestMoneyTransfer`              | POST        | EMPLOYEE     | Employee request money transfer from application                                                                 |
| `/employees/allInCompany`                      | GET         | CLIENT_ADMIN | Find all employees that has same company id as signed in client admin                                            |
| `/employees`                                   | POST        | CLIENT_ADMIN | Add an employee to company                                                                                       |
| `/employees/{id}`                              | GET         | CLIENT_ADMIN | Find an employee by id                                                                                           |
| `/employees/{id}`                              | PATCH       | CLIENT_ADMIN | Update an employee                                                                                               |
| `/employees/{id}`                              | DELETE      | CLIENT_ADMIN | Delete an employee                                                                                               |
| `/employee/upsert/`                            | POST        | CLIENT_ADMIN | Create and/or Update (if already exists) multiple users (use same request body as create an employee but array ) |
| `/employeeRequestTransactions/history/{id}`    | GET         | EMPLOYEE     | Employee request a money transfer transaction                                                                    |
| `/clientAdmins`                                | POST        | HERO         | Create a client admin                                                                                            |
| `/clientAdmins`                                | GET         | HERO         | Find all client admins                                                                                           |
| `/clientAdmins/findAllByCompanyId/{companyId}` | GET         | HERO         | Find all client admins in company                                                                                |
| `/clientAdmins/{id}`                           | GET         | HERO         | Find a client admin by id                                                                                        |
| `/clientAdmins/{id}`                           | PATCH       | HERO         | Update a client admin                                                                                            |
| `/clientAdmins/{id}`                           | DELETE      | HERO         | Delete a client admin                                                                                            |

Notes: every delete API is hard-delete, so every relation will be also deleted.

## Hidden API List

There are some hidden APIs which only `HERO` role can access and not presented in SwaggerUI

| API           | HTTP Method | Description                                                                                      |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------ |
| `/userRoles`  | GET         | Find all relation between user and role through userRole model that contains user id and role id |
| `/roles`      | POST        | Create a role                                                                                    |
| `/roles`      | GET         | Find all roles                                                                                   |
| `/roles/{id}` | GET         | Find a role by id                                                                                |
| `/role/{id}s` | PATCH       | Update a role                                                                                    |
| `/roles/{id}` | DELETE      | Delete a role                                                                                    |

## Role

`HERO`, `CLIENT_ADMIN` and `EMPLOYEE`

## Contact

email: nopprakorn.sarinsakul@gmail.com
phone: +66880759306
