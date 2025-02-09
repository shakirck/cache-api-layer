# Cache API Service

A simple key-value cache service built with Express and TypeScript, deployed on Vercel.(Swagger UI IS NOT WORKING in VERCEL)

## Base URL

```
https://castro-cache.vercel.app
```

## API Endpoints

### Store Value in Cache
Stores a key-value pair in the cache.

```http
POST /cache
```

**Request Body:**
```json
{
  "key": "string",
  "value": "any"
}
```

**Example:**
```json
{
  "key": "sds",
  "value": "bar"
}
```

### Retrieve Value from Cache
Retrieves a value from the cache using its key.

```http
GET /cache/{key}
```

**Parameters:**
- `key` (path parameter): The key to look up

**Example:**
```http
GET /cache/d
```

### Delete Value from Cache
Removes a value from the cache.

```http
DELETE /cache/{key}
```

**Parameters:**
- `key` (path parameter): The key to delete

**Example:**
```http
DELETE /cache/d
```

### List All Cache Entries
Retrieves all key-value pairs currently in the cache.

```http
GET /list
```

## Using with Postman

1.  Download the postman collection from /docs folder

## API Documentation

Swagger documentation is available at:
```
https://castro-cache.vercel.app/api-docs
```

## Notes
- The cache has a size limit of 3 entries
- Cache is in-memory and will be cleared on server restart
- All requests and responses use JSON format
- The service is hosted on Vercel's serverless infrastructure

## Local Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

