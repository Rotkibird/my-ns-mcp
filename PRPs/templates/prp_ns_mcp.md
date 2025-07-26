---
name: "NS MCP Server PRP Template"
description: This template is designed to provide a production-ready Model Context Protocol (MCP) server for the Dutch Railways API using custom API key auth and rate limiting.
---

## Purpose

Template optimized for AI agents to interact securely with Dutch public transport data (NS Stations API) through a custom-authenticated MCP server. This server uses API key authentication, rate limiting, and production-grade patterns.

## Core Principles

1. **Context is King**: Include all relevant MCP tool/resource logic and transport-layer security
2. **Validation Loops**: Enforce schema-level validation with Zod and API rate enforcement
3. **Security First**: Use API key auth with scoped access and per-key rate limiting
4. **Production Ready**: Modular, testable, cacheable, and suitable for edge deployment

---

## Goal

Build a production-ready MCP (Model Context Protocol) server with:

- **NS Stations API wrapper** (v2/v3 tools and resources)
- **Custom API key authentication** (no GitHub OAuth)
- **Per-key rate limiting middleware**
- Optional Redis caching for heavy endpoints

## Why

- **Developer Productivity**: Enables AI agents to access transport data with natural prompts
- **Security**: API key protection and rate limiting prevent abuse
- **Scalability**: Modular tools and stateless architecture
- **Integration**: Wraps public NS API for internal agents and external partners
- **User Value**: Power intelligent location-based transport apps

## What

### MCP Server Features

**Core MCP Tools:**

- `get-stations-v2`
- `get-nearest-stations-v2`
- `get-stations-v3`
- `get-nearest-stations-v3`
- Tools are modular and registered via `src/tools/register-tools.ts`

**MCP Resources:**

- `stations://v2/all` – all V2 stations
- `stations://v3/all` – all V3 stations

**Authentication & Authorization:**

- Custom API key validation middleware (`x-api-key` header or `Authorization: Bearer ...`)
- Keys are stored and validated against a list or external system
- Middleware wrapper (`withAuthAndRateLimit`) used on all tools/resources
- Rate limiting: e.g. 100 calls per minute per key, Redis-backed

**Deployment & Monitoring:**

- Deployable to Cloudflare Workers or Node-based platforms (Railway, Fly.io)
- `.env` file for secrets like NS API key
- Optional: add Redis or in-memory cache layer
- Logging middleware for observability

### Success Criteria

- [ ] MCP server passes validation with MCP Inspector
- [ ] API key auth is enforced correctly on every endpoint
- [ ] Rate limiting prevents overuse per key
- [ ] TypeScript compiles with no errors
- [ ] MCP tools return correct data from NS API
- [ ] Resources are correctly exposed with static content or caching
- [ ] Errors are gracefully handled and logged
- [ ] Optional: Redis cache validated for heavy endpoints

## All Needed Context

### Documentation & References (MUST READ)

```yaml
- url: https://modelcontextprotocol.io/docs/concepts/tools
  why: MCP tool registration and schema validation

- url: https://modelcontextprotocol.io/docs/concepts/resources
  why: Understand how to implement resource URIs like `stations://v3/all`

- file: src/server/auth.ts
  why: Contains API key auth logic — CRITICAL for access control

- file: src/server/rateLimiter.ts
  why: Middleware rate limiting logic using Redis or memory

- file: src/tools/register-tools.ts
  why: Registers all tools in one place using shared wrapper logic

- file: src/resources/stationsV3.ts
  why: Shows how to expose NS API results as MCP resources


# Add n documentation related to the users use case as needed below

- file: PRPs/ai_docs/nsapp-stations-api.json
  why: Specifications of the NS API for stations information
  
```

### Current Codebase Tree (Run `tree -I node_modules` in project root)

```bash
# INSERT ACTUAL TREE OUTPUT HERE
/
├── src/
│   ├── index.ts                 # Main authenticated MCP server ← STUDY THIS
│   ├── index_sentry.ts         # Sentry monitoring version
│   ├── simple-math.ts          # Basic MCP example ← GOOD STARTING POINT
│   ├── github-handler.ts       # OAuth implementation ← REPLACE THIS PATTERN
│   ├── database.ts             # Database utilities ← SECURITY PATTERNS
│   ├── utils.ts                # OAuth helpers ← REMOVE THIS PATTERN
│   ├── workers-oauth-utils.ts  # Cookie security system ← REMOVE THIS PATTERN
│   └── tools/                  # Tool registration system
│       └── register-tools.ts   # Central tool registry ← UNDERSTAND THIS
├── PRPs/
│   ├── templates/prp_mcp_base.md  # This template
│   └── ai_docs/                   # Implementation guides ← READ ALL
├── examples/                   # Example tool implementations
│   ├── database-tools.ts       # Database tools example ← FOLLOW PATTERN
│   └── database-tools-sentry.ts # With Sentry monitoring
├── wrangler.jsonc              # Cloudflare config ← COPY PATTERNS
├── package.json                # Dependencies
└── tsconfig.json               # TypeScript config
```
### Desired Codebase Tree (Files to add/modify) related to the users use case as needed below

```bash

  /
├── src/
│   ├── server/
│   │   ├── index.ts
│   │   ├── setupServer.ts
│   │   ├── auth.ts
│   │   ├── rateLimiter.ts
│   │   └── middleware.ts
│   ├── tools/
│   │   ├── getStationsV2.ts
│   │   ├── getNearestStationsV2.ts
│   │   ├── getStationsV3.ts
│   │   ├── getNearestStationsV3.ts
│   │   └── register-tools.ts
│   ├── resources/
│   │   ├── stationsV2.ts
│   │   └── stationsV3.ts
│   ├── api/
│   │   └── stationsApi.ts
│   └── lib/
│       ├── zodSchemas.ts
│       └── cache.ts
├── .env
├── package.json
├── tsconfig.json

```

### Known Gotchas & Critical MCP/Cloudflare Patterns

```typescript
// CRITICAL: Cloudflare Workers require specific patterns
// 1. ALWAYS implement cleanup for Durable Objects
export class YourMCP extends McpAgent<Env, Record<string, never>, Props> {
  async cleanup(): Promise<void> {
    await closeDb(); // CRITICAL: Close database connections
  }

  async alarm(): Promise<void> {
    await this.cleanup(); // CRITICAL: Handle Durable Object alarms
  }
}

// 2. ALWAYS validate SQL to prevent injection (use existing patterns)
const validation = validateSqlQuery(sql); // from src/database.ts
if (!validation.isValid) {
  return createErrorResponse(validation.error);
}

// 3. ALWAYS check permissions before sensitive operations
const ALLOWED_USERNAMES = new Set(["admin1", "admin2"]);
if (!ALLOWED_USERNAMES.has(this.props.login)) {
  return createErrorResponse("Insufficient permissions");
}

// 4. ALWAYS use withDatabase wrapper for connection management
return await withDatabase(this.env.DATABASE_URL, async (db) => {
  // Database operations here
});

// 5. ALWAYS use Zod for input validation
import { z } from "zod";
const schema = z.object({
  param: z.string().min(1).max(100),
});

// 6. TypeScript compilation requires exact interface matching
interface Env {
  DATABASE_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  OAUTH_KV: KVNamespace;
  // Add your environment variables here
}
```

### Implementation Blueprint

#### Data Models & Types
```ts
const GetStationsV3Schema = z.object({
  q: z.string().min(2).optional(),
  limit: z.number().min(1).max(100).optional(),
  countryCodes: z.array(z.string()).optional(),
  includeNonPlannableStations: z.boolean().optional(),
})
```
#### Wrapper Middleware
```ts
export function withAuthAndRateLimit<T extends z.ZodTypeAny>(
  schema: T,
  handler: (params: z.infer<T>, context: any) => Promise<any>
) {
  return async (params: unknown, context: any) => {
    const apiKey = context.headers["x-api-key"] || context.headers["authorization"]?.split(" ")[1]
    validateApiKey(apiKey)
    await checkRateLimit(apiKey)

    const parsed = schema.safeParse(params)
    if (!parsed.success) throw new Error("Invalid input")
    return handler(parsed.data, context)
  }
}
```

#### List of Tasks
```yaml
Task 1 - Project Initialization
  - Scaffold project with the folder tree above
  - Install MCP SDK, Zod, Axios, dotenv, (optional: ioredis)

Task 2 - Auth & Rate Limit
  - Implement `auth.ts` and `rateLimiter.ts`
  - Add `withAuthAndRateLimit()` middleware wrapper
  - Protect all tools/resources with it

Task 3 - NS API Integration
  - Wrap each endpoint with Axios in `stationsApi.ts`
  - Validate responses and sanitize input via schemas

Task 4 - MCP Tool & Resource Definitions
  - Define tools using `server.tool()`
  - Define resources using `server.resource()`
  - Use proper MIME types and URI formats

Task 5 - Testing
  - Write test cases for valid and invalid API key calls
  - Simulate rate limit breaches
  - Test tool and resource correctness

Task 6 - Deployment
  - Add `Dockerfile` or deploy to Cloudflare/Node host
  - Store NS API key and user API keys as secrets
```
### Per Task Implementation Details

```typescript
// Task 4 - MCP Server Implementation Pattern
export class YourMCP extends McpAgent<Env, Record<string, never>, Props> {
  server = new McpServer({
    name: "Your MCP Server Name",
    version: "1.0.0",
  });

  // CRITICAL: Always implement cleanup
  async cleanup(): Promise<void> {
    try {
      await closeDb();
      console.log("Database connections closed successfully");
    } catch (error) {
      console.error("Error during database cleanup:", error);
    }
  }

  async alarm(): Promise<void> {
    await this.cleanup();
  }

  async init() {
    // PATTERN: Use centralized tool registration
    registerAllTools(this.server, this.env, this.props);
  }
}

// Task 3 - Tool Module Pattern (e.g., src/tools/your-feature-tools.ts)
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Props } from "../types";
import { z } from "zod";

const PRIVILEGED_USERS = new Set(["admin1", "admin2"]);

export function registerYourFeatureTools(server: McpServer, env: Env, props: Props) {
  // Tool 1: Available to all authenticated users
  server.tool(
    "yourBasicTool",
    "Description of your basic tool",
    YourToolSchema, // Zod validation schema
    async ({ param1, param2, options }) => {
      try {
        // PATTERN: Tool implementation with error handling
        const result = await performOperation(param1, param2, options);

        return {
          content: [
            {
              type: "text",
              text: `**Success**\n\nOperation completed\n\n**Result:**\n\`\`\`json\n${JSON.stringify(result, null, 2)}\n\`\`\``,
            },
          ],
        };
      } catch (error) {
        return createErrorResponse(`Operation failed: ${error.message}`);
      }
    },
  );

  // Tool 2: Only for privileged users
  if (PRIVILEGED_USERS.has(props.login)) {
    server.tool(
      "privilegedTool",
      "Administrative tool for privileged users",
      { action: z.string() },
      async ({ action }) => {
        // Implementation
        return {
          content: [
            {
              type: "text",
              text: `Admin action '${action}' executed by ${props.login}`,
            },
          ],
        };
      },
    );
  }
}
```



### Integration Points

```yaml

MCP_SERVER:
  - src/server/index.ts: Main MCP server entrypoint
  - src/server/setupServer.ts: Registers tools/resources and returns configured McpServer
  - src/server/middleware.ts: Defines `withAuthAndRateLimit()` wrapper
  - src/server/auth.ts: Validates API key from headers
  - src/server/rateLimiter.ts: Enforces per-key rate limits using Redis

NS_API:
  - src/api/stationsApi.ts: Axios wrapper for NS endpoints (v2 & v3)
  - NS API key: Set in `.env` as `NS_API_KEY`
  - Headers: Set `Ocp-Apim-Subscription-Key` in each request

REDIS (optional):
  - Used for request rate limiting (`rateLimiter.ts`)
  - Redis URL: Stored as `REDIS_URL` in `.env`
  - Use `ioredis` package in Node.js
  - Integration is optional but recommended for production rate enforcement

ENVIRONMENT_VARIABLES:
  - Development: `.env` file (use `dotenv`)
  - Production: Load secrets via platform (e.g., Railway, Fly.io, Docker secrets)
  - Required:
    - `NS_API_KEY`: Secret subscription key for calling NS endpoints
    - `REDIS_URL`: Redis connection string (for rate limiting)
    - `VALID_API_KEYS`: Comma-separated string or external config (for custom auth)

DEPLOYMENT:
  - Cloudflare Workers: Not default unless MCP edge support is needed
  - Node Hosts: Works with any Node-compatible host (Railway, Fly.io, Heroku, Docker)
  - Dockerfile: Use lightweight Node image for deployment
  - Healthcheck route (optional): Add `/status` endpoint to verify uptime

LOGGING & MONITORING:
  - Optional: Integrate `pino` or `winston` for structured logs
  - Rate limiter: Log rate violations with key and timestamp
  - Auth: Log failed API key attempts with limited context

TOOL & RESOURCE REGISTRATION:
  - src/tools/register-tools.ts: Central registry for all MCP tools
  - src/resources/register-resources.ts: Central registry for all MCP resources
  - Use `withAuthAndRateLimit` wrapper around every tool and resource definition

TESTING:
  - Unit tests: Validate individual NS API calls and auth
  - Integration tests: Simulate full tool invocations with valid/invalid keys
  - Rate limit tests: Exceed limit and expect rejection with appropriate error
```

## Validation Gate

### Level 1: TypeScript & Configuration

```bash
# CRITICAL: Run these FIRST - fix any errors before proceeding
npm run type-check                 # TypeScript compilation
wrangler types                     # Generate Cloudflare Workers types

# Expected: No TypeScript errors
# If errors: Fix type issues, missing interfaces, import problems
```

### Level 2: Local Development Testing

```bash
# Start local development server
wrangler dev



# Test MCP endpoint (should return server info)
curl -v http://localhost:8792/mcp

# Expected: Server starts, MCP responds with server info
# If errors: Check console output, verify environment variables, fix configuration
```

### Level 3: Unit test each feature, function, and file, following existing testing patterns if they are there.

```bash
npm run test
```

Run unit tests with the above command (Vitest) to make sure all functionality is working.


### Final Validation Checklist

 - [ ] Custom API key auth enforced globally

 - [ ] Rate limiting blocks overuse per key

 - [ ] MCP tools return correct NS API results

 - [ ] MCP resources resolve with static or cached content

 - [ ] TypeScript compilation and linting pass

 - [ ] MCP Inspector recognizes all defined tools

 - [ ] Basic test coverage achieved

 ## Anti-Patterns to Avoid

### MCP-Specific

- ❌ Don't skip input validation with Zod - always validate tool parameters
- ❌ Don't forget to implement cleanup() method for Durable Objects
- ❌ Don't hardcode user permissions - use configurable permission systems

### Development Process

- ❌ Don't skip the validation loops - each level catches different issues
- ❌ Don't guess about OAuth configuration - test the full flow
- ❌ Don't deploy without monitoring - implement logging and error tracking
- ❌ Don't ignore TypeScript errors - fix all type issues before deployment