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

## Predefined users
You may use these users for some of your testing scenarios.

```
+----+-------------------+---------------+-----------+--------+----------+
| id | email             | password      | name      | bossId | role     |
+----+-------------------+---------------+-----------+--------+----------+
| 1  | admin@example.com | adminpassword | Admin User| NULL   | admin    |
| 2  | boss@example.com  | bosspassword  | Boss User | NULL   | boss     |
| 3  | user1@example.com | password1     | User 1    | NULL   | regular  |
| 4  | user2@example.com | password2     | User 2    | 2      | regular  |
| 5  | user3@example.com | password3     | User 3    | 2      | regular  |
| 6  | user4@example.com | password4     | User 4    | 3      | boss     |
| 7  | user5@example.com | password5     | User 5    | 6      | regular  |
+----+-------------------+---------------+-----------+--------+----------+

```