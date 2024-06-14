# Contact Api Spec

## Create Contact Api

Endpoint : POST /api/contacts

Headers :

-Authorization : token

Request Body :

```json
{
  "firstName": "Muhammad",
  "lastName": "Hashfi",
  "email": "hss@gmail.com",
  "phone": "8764853648"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Muhammad",
    "lastName": "Hashfi",
    "email": "hss@gmail.com",
    "phone": "8764853648"
  }
}
```

Response Body Error:

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact Api

Endpoint : PUT /api/contacts/:id

Headers :

-Authorization : token

Request Body :

```json
{
  "data": {
    "id": 1,
    "firstName": "Muhammad",
    "lastName": "Hashfi",
    "email": "hss@gmail.com",
    "phone": "8764853648"
  }
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Muhammad",
    "lastName": "Hashfi",
    "email": "hss@gmail.com",
    "phone": "8764853648"
  }
}
```

Response Body Error:

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact Api

Endpoint : POST /api/contacts/:id

Headers :

-Authorization : token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "firstName": "Muhammad",
    "lastName": "Hashfi",
    "email": "hss@gmail.com",
    "phone": "8764853648"
  }
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact Api

Endpoint : GET /api/contacts

Headers :

-Authorization : token

Query Params :

- name : Search by first_name,using lilke, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : Number of page, default 1
- size : Size per page, default 10

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "firstName": "Muhammad",
      "lastName": "Hashfi",
      "email": "hss@gmail.com",
      "phone": "8764853648"
    },
    {
      "id": 2,
      "firstName": "Muhammad",
      "lastName": "Hashfi",
      "email": "hss@gmail.com",
      "phone": "8764853648"
    }
  ],
  "paging": {
    "page": 1,
    "totalPage": 3,
    "totalItem": 30
  }
}
```

Response Body Error:

```json
{
  "errors": "Contact not found"
}
```

## Remove Contact Api

Endpoint : DELETE /api/contacts/:id

Headers :

-Authorization : token

Response Body Success:

```json
{
  "data": "OK"
}
```

Response Body Error:

```json
{
  "errors": "Contact is not found"
}
```
