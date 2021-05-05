# koa-backend

HEADER (LOCALHOST BASED ON DEFAULT SECRET KEY 'your-secret-whatever')
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSmF2aWVyIEF2aWxlcyIsImVtYWlsIjoiYXZpbGVzbG9wZXouamF2aWVyQGdtYWlsLmNvbSJ9.rgOobROftUYSWphkdNfxoN2cgKiqNXd4Km4oz6Ex4ng
```

[Swagger](http://localhost:3000/swagger-html/)

| method             | resource         | description                                                                                    |
|:-------------------|:-----------------|:-----------------------------------------------------------------------------------------------|
| `GET`              | `/`              | Simple hello world response                                                                    |
| `GET`              | `/users`         | returns the collection of users present in the DB                                              |
| `GET`              | `/users/:id`     | returns the specified id user                                                                  |
| `POST`             | `/users`         | creates a user in the DB (object user to be includued in request's body)                       |
| `PUT`              | `/users/:id`     | updates an already created user in the DB (object user to be includued in request's body)      |
| `DELETE`           | `/users/:id`     | deletes a user from the DB (JWT token user ID must be the same as the user you want to delete) |


[Deployed](https://koa-back.herokuapp.com/swagger-html)

use Bearer string for authorization 


Local Env: 
Run app with databases in a docker-compose 

```
    docker-compose -f stack.yml up
```

[Swagger](http://localhost:3080/swagger-html)
[PgAdmin](http://localhost:8888/)

login with credentials:
```
    username: localuser@localhost.localnet
    password: localpass
```
and create server connection 

```
    POSTGRES_PASSWORD: postgres
    POSTGRES_USER: postgres
    POSTGRES_DB: postgres
    POSTGRES_HOST: db
```

[Postman Collection](https://www.getpostman.com/collections/9d855b78d71e73bbabb2)

no tests 
