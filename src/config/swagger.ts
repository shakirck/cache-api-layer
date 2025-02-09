// src/config/swagger.ts

export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "Cache API",
      version: "1.0.0",
      description: "A simple cache API with key-value storage",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        CacheEntry: {
          type: "object",
          properties: {
            key: {
              type: "string",
              description: "Cache key",
            },
            value: {
              type: "object",
              description: "Value to be stored",
            },
            // ttl: {
            //   type: "number",
            //   description: "Time to live in seconds (optional)",
            // },
          },
          required: ["key", "value"],
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: "The specified key was not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        InvalidInput: {
          description: "Invalid input parameters",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    paths: {
      "/cache": {
        post: {
          summary: "Store a value in cache",
          tags: ["Cache Operations"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CacheEntry",
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Value stored successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                      },
                      key: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            "400": {
              $ref: "#/components/responses/InvalidInput",
            },
            "500": {
              description: "Internal server error",
            },
          },
        },
      },
      "/cache/{key}": {
        get: {
          summary: "Retrieve a value from cache",
          tags: ["Cache Operations"],
          parameters: [
            {
              name: "key",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "Cache key to retrieve",
            },
          ],
          responses: {
            "200": {
              description: "Cache entry retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      value: {
                        type: "object",
                        description: "Stored value",
                      },
                      cached_at: {
                        type: "string",
                        format: "date-time",
                        description: "Timestamp when the value was cached",
                      },
                    },
                  },
                },
              },
            },
            "404": {
              $ref: "#/components/responses/NotFound",
            },
            "500": {
              description: "Internal server error",
            },
          },
        },
        delete: {
          summary: "Remove a value from cache",
          tags: ["Cache Operations"],
          parameters: [
            {
              name: "key",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "Cache key to delete",
            },
          ],
          responses: {
            "200": {
              description: "Cache entry removed successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            "404": {
              $ref: "#/components/responses/NotFound",
            },
            "500": {
              description: "Internal server error",
            },
          },
        },
      },
      '/list': {
            get: {
                summary: 'List all cache entries',
                responses: {
                    '200': {
                        description: 'List of all cache entries'
                    }
                }
            }
        }
    },
  };