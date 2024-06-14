# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "jalan",
  "city": "kota",
  "province": "Provinsi",
  "country": "kota",
  "portalCode": "Kode Pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "kota",
    "province": "Provinsi",
    "country": "kota",
    "portalCode": "Kode Pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Conutry is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "jalan",
  "city": "kota",
  "province": "Provinsi",
  "country": "kota",
  "portalCode": "Kode Pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "kota",
    "province": "Provinsi",
    "country": "kota",
    "portalCode": "Kode Pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Conutry is required"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contact:Id/addresses/:addressesId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan",
    "city": "kota",
    "province": "Provinsi",
    "country": "kota",
    "portalCode": "Kode Pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## List Address API

Endpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "jalan",
      "city": "kota",
      "province": "Provinsi",
      "country": "kota",
      "portalCode": "Kode Pos"
    },
    {
      "id": 2,
      "street": "jalan",
      "city": "kota",
      "province": "Provinsi",
      "country": "kota",
      "portalCode": "Kode Pos"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

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
  "errors": "address is not found"
}
```
