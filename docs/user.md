# User Api Spec

## Register User Api

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "hass",
  "password": "test",
  "name": "Muhammad Hashfi"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "hass",
    "name": "Muhammad Hashfi"
  }
}
```

Respose Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User Api

Enpoint : POST/api/users/login

Response Body :

```json
{
  "username": "hass",
  "password": "test"
}
```

Response Body Success:

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username or password wrong"
}
```

## Update User Api

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Muhammad hashfi RM", //optional
  "password": "testlagi" //optional
}
```

Response Body Success :

```json
{
  "data": {
    "Username": "hass",
    "name": "Muhammad hashfi RM"
  }
}
```

Response Body Error :

```json
{
  "errors": "Name length max 100"
}
```

## Get User Api

Endpoint : GET api/users/current

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "Username": "hass",
    "name": "Muhammad hashfi"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorization"
}
```

## Logout User Api

Endpoint : DELETE api/users/logout

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorization"
}
```
