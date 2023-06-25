## Steps to run the app

1. create `.env` file in the root of the app. Next to `package.json` file
2. fill it with the content of `.env.example` file. P.S. for demo purposes, all sensitive data is stored in `.env` while on production some of the data would be taken from secrets.
3. run `docker-compose build` command in the terminal from the root of your app.
4. run `docker-compose up` command in the terminal from the root of your app.

## Host and port

```
http://localhost:3000
```

## Endpoints

```
POST /auth/register

{
    "email": String,
    "password": String
}
```

```
POST /auth/login

{
    "email": String,
    "password": String
}
```

```
GET /users

headers

{
    "Authorization": "Bearer <token received from /auth/login>"
}
```

```
PUT /users/update/{id}

headers

{
    "Authorization": "Bearer <token received from /auth/login>"
}

body

{
    "id": Number
}
```