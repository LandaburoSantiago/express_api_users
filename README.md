# Pre requisitos

- Instalar docker
- Instalar prisma de manera global `npm i -g prisma`

# Pasos

- Ejecutar docker-compose up para levantar Postgresql
- Crear archivo .env con sus respectivas variables
- Ejecutar npm i
- Ejecutar npm run start para levantar el servidor

# Documentación

Esta es una api simple de gestión de usuarios. El usuario por defecto tiene las siguientes credenciales:

```json
{
  "phone": "admin",
  "password": "admin"
}
```

##

#### Login

```http
  POST /api/v1/users/login
```

| Key            | Value              |
| :------------- | :----------------- |
| `Content-Type` | `application/json` |

#### Body (raw)

```json
{
  "phone": "string",
  "password": "string"
}
```

#### Response

```json
{
    "id": 53,
    "name": "prueba",
    "email": "prueba@fakemail.com",
    "phone": "020202",
    "address": "AV Trist 14 05"
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVfcGhvbmUiOiIwMjAyMDIiLCJlbWFpbC
    I6InBydWViYW9uYm9kYXJkaW5nNzAwQHlvcG1haWwuY29tIiwiZXhwIjoxNjMxODkxODM5fQ.26sWIpQ
    k3HsMeLNWK1_sVbDyUbE8nNKUp5s3xjF0Uog",
    "token_type":"bearer"
}
```

#### Get all users

```http
  GET /api/v1/users
```

| Key            | Value              |
| :------------- | :----------------- |
| `Content-Type` | `application/json` |

#### Response

```json
[
  {
    "name": "admin",
    "email": "admin@admin.com",
    "phone": "admin",
    "address": "CALLE 123"
  },
  {
    "name": "test",
    "email": "test@email.com",
    "phone": "11",
    "address": "address"
  },
  {
    "name": "testDTO",
    "email": "mail@mail.com",
    "phone": "34466334",
    "address": "testDTO"
  }
]
```

#### Get user (Protected: Login is required)

```http
  GET /api/v1/users/${id}
```

| Key            | Value              |
| :------------- | :----------------- |
| `Content-Type` | `application/json` |

#### Response

```json
{
  "name": "admin",
  "email": "admin@admin.com",
  "phone": "admin",
  "address": "CALLE 123"
}
```

#### Create User (Protected: Login is required)

```http
  POST /api/v1/users/createUser
```

| Key            | Value              |
| :------------- | :----------------- |
| `Content-Type` | `application/json` |

#### Body (raw)

```json
{
  "name": "string",
  "phone": "string",
  "email": "user@example.com",
  "password": "string",
  "address": "string"
}
```

#### Response

```json
{
  "name": "admin",
  "email": "admin@admin.com",
  "phone": "admin",
  "address": "CALLE 123"
}
```

#### Update User (Protected: Login is required)

```http
  PUT /api/v1/users/updateUser/${id}
```

| Key            | Value              |
| :------------- | :----------------- |
| `Content-Type` | `application/json` |

#### Body (raw)

```json
{
  "name": "string",
  "phone": "string",
  "email": "user@example.com",
  "password": "string",
  "address": "string"
}
```

#### Response

```json
{
  "name": "admin",
  "email": "admin@admin.com",
  "phone": "admin",
  "address": "CALLE 123"
}
```

#### Delete User (Protected: Login is required)

```http
  DELETE /api/v1/users/deleteUser/${id}
```

| Key            | Value              |
| :------------- | :----------------- |
| `Content-Type` | `application/json` |

#### Response Status 204

```json
{
  "message": "ok"
}
```
