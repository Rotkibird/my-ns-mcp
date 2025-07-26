---
name: "NS PRP Management MCP Server"
description: A comprehensive MCP server providing Dutch Railways API access with AI-powered PRP parsing and task management capabilities.
---

## Purpose

Production-ready MCP server that combines Dutch Railways (NS) API access with intelligent PRP (Product Requirement Prompt) management. Uses GitHub OAuth authentication, PostgreSQL database, Anthropic AI for PRP parsing, and provides comprehensive task/documentation CRUD operations.

## Core Principles

1. **Context is King**: Include all NS API patterns, PRP parsing logic, and database management capabilities
2. **Validation Loops**: Comprehensive testing from TypeScript compilation to production deployment
3. **Security First**: GitHub OAuth with role-based access, SQL injection protection, API key management
4. **Production Ready**: Cloudflare Workers deployment with monitoring and error handling
5. **AI Integration**: Seamless Anthropic API integration for intelligent PRP parsing

---

## Goal

Build a production-ready MCP (Model Context Protocol) server with:

- **NS Railways API Integration** - Secure access to Dutch public transport data
- **AI-Powered PRP Parsing** - Anthropic-based extraction of tasks from PRPs
- **Task Management System** - Complete CRUD operations for tasks, documentation, and tags
- **GitHub OAuth Authentication** - Role-based access control with user permissions
- **PostgreSQL Database** - Structured storage for tasks, PRPs, and metadata
- **Cloudflare Workers Deployment** - Global edge deployment with monitoring

## Why

- **Developer Productivity**: Enable AI assistants to manage Dutch transport data and project requirements
- **Enterprise Security**: GitHub OAuth with granular permission system and API key management
- **AI-Enhanced Workflow**: Automated extraction of actionable tasks from requirement documents
- **Scalability**: Cloudflare Workers global edge deployment with database connection pooling
- **Integration**: Bridge between NS public APIs and internal project management systems
- **User Value**: Streamlined PRP-to-task workflow with intelligent parsing and organization

## What

### MCP Server Features

**Core MCP Tools:**

**NS API Integration:**
- `getStationsV2` - Search NS stations using V2 API
- `getNearestStationsV2` - Find nearby stations using coordinates (V2)
- `getStationsV3` - Enhanced station search using V3 API  
- `getNearestStationsV3` - Find nearby stations using coordinates (V3)
- `getRouteGeometry` - Get route geometry between stations (SpoorKaart API)
- `getDisruptions` - Get current service disruptions (SpoorKaart API)
- `getTravelInfo` - Access travel information (ReisinformatieAPI - requires parsing)

**PRP Management & AI Parsing:**
- `parsePRP` - Use Anthropic AI to extract tasks from PRP documents
- `listPRPs` - Get all PRPs stored in database
- `getPRPById` - Retrieve specific PRP with metadata
- `updatePRPMetadata` - Modify PRP goals, target users, descriptions

**Task Management:**
- `listTasks` - Get all tasks with filtering and pagination
- `getTaskById` - Retrieve specific task with full details
- `createTask` - Create new task manually or from PRP parsing
- `updateTask` - Modify task details, status, assignments
- `deleteTask` - Remove task from system
- `addTaskDocumentation` - Attach documentation to tasks
- `updateTaskDocumentation` - Modify attached documentation

**Tag & Organization:**
- `listTags` - Get all available tags
- `createTag` - Create new organizational tags
- `assignTagsToTask` - Tag tasks for organization
- `getTasksByTag` - Filter tasks by tag assignments

**Authentication & Authorization:**

- GitHub OAuth 2.0 integration with HMAC-signed cookie approval system
- Role-based access control (read-only vs privileged users vs admin)
- User context propagation to all MCP tools
- Secure session management with encrypted cookies
- API key management for NS API access

**Database Integration:**

- PostgreSQL with enhanced schema for PRP/task management
- Connection pooling optimized for Cloudflare Workers
- SQL injection protection and query validation
- Transaction support for multi-table operations
- Read/write operation separation based on user permissions

**AI Integration:**

- Anthropic Claude API integration for PRP parsing
- Configurable model selection (Claude 3.5 Sonnet, etc.)
- Structured JSON output for task extraction
- Context-aware parsing with project metadata
- Error handling and fallback strategies

**Deployment & Monitoring:**

- Cloudflare Workers with Durable Objects for state management
- Optional Sentry integration for error tracking and performance monitoring
- Environment-based configuration (development vs production)
- Real-time logging and alerting
- API rate limiting and usage monitoring

### Success Criteria

- [ ] MCP server passes validation with MCP Inspector
- [ ] GitHub OAuth flow works end-to-end (authorization → callback → MCP access)
- [ ] TypeScript compilation succeeds with no errors
- [ ] All NS API integrations return correct data with proper error handling
- [ ] Anthropic AI parsing extracts tasks accurately from PRP documents
- [ ] Database CRUD operations work for tasks, PRPs, and tags
- [ ] User permissions prevent unauthorized access to sensitive operations
- [ ] Local development server starts and responds correctly
- [ ] Production deployment to Cloudflare Workers succeeds
- [ ] Rate limiting prevents API abuse
- [ ] Error handling provides user-friendly messages without leaking system details

## All Needed Context

### Documentation & References (MUST READ)

```yaml
# CRITICAL MCP PATTERNS - Read these first
- file: PRPs/ai_docs/mcp_patterns.md
  why: Core MCP development patterns, security practices, and error handling

# ANTHROPIC API INTEGRATION - Essential for PRP parsing
- file: PRPs/ai_docs/claude_api_usage.md
  why: How to use the Anthropic API to get structured responses from Claude

# TOOL REGISTRATION SYSTEM - Understand the modular approach
- file: src/tools/register-tools.ts
  why: Central registry showing how all tools are imported and registered - STUDY this pattern

# EXISTING MCP IMPLEMENTATION - Core patterns to follow
- file: src/index.ts
  why: Complete MCP server with authentication, database, and tools - MIRROR this pattern

- file: src/index_sentry.ts
  why: Sentry-enabled version for production monitoring - USE for production deployment

# AUTHENTICATION PATTERNS - GitHub OAuth implementation
- file: src/auth/github-handler.ts
  why: OAuth flow implementation - USE this exact pattern for authentication

- file: src/auth/oauth-utils.ts
  why: Cookie security and session management - FOLLOW these patterns

# DATABASE INTEGRATION - Security and connection patterns
- file: src/database/connection.ts
  why: PostgreSQL connection pooling - USE these patterns

- file: src/database/security.ts
  why: SQL injection protection and validation - CRITICAL for database security

- file: src/database/utils.ts
  why: Database operation wrappers and error handling - FOLLOW these patterns

# EXAMPLE TOOL IMPLEMENTATIONS - Study these patterns
- file: examples/database-tools.ts
  why: Database tools example showing best practices for tool creation and registration

- file: examples/database-tools-sentry.ts
  why: Same tools with Sentry integration for production monitoring

# CLOUDFLARE WORKERS CONFIGURATION
- file: wrangler.jsonc
  why: Cloudflare Workers configuration - COPY this pattern for deployment

# NS API SPECIFICATIONS - External API integration patterns
- file: PRPs/ai_docs/nsapp-stations-api.json
  why: NS Stations API specification - stations search and location services

- file: PRPs/ai_docs/spoorkaart-api.json
  why: SpoorKaart API specification - route geometry and disruption information

- file: PRPs/ai_docs/reisinformatie-api.json
  why: Travel information API specification - comprehensive travel data (large file, use grep to explore)

# OFFICIAL MCP DOCUMENTATION
- url: https://modelcontextprotocol.io/docs/concepts/tools
  why: MCP tool registration and schema definition patterns

- url: https://modelcontextprotocol.io/docs/concepts/resources
  why: MCP resource implementation if needed for static data serving
```

### Current Codebase Tree

```bash
/
├── src/
│   ├── index.ts                 # Main authenticated MCP server ← STUDY THIS
│   ├── index_sentry.ts         # Sentry monitoring version ← USE FOR PRODUCTION
│   ├── auth/                   # Authentication system
│   │   ├── github-handler.ts   # OAuth implementation ← USE THIS PATTERN
│   │   └── oauth-utils.ts      # Cookie security system ← SECURITY PATTERNS
│   ├── database/               # Database integration
│   │   ├── connection.ts       # Connection pooling ← CONNECTION PATTERNS
│   │   ├── security.ts         # SQL validation ← SECURITY CRITICAL
│   │   └── utils.ts            # Database utilities ← ERROR HANDLING
│   ├── server/                 # Server utilities (rate limiting, etc.)
│   │   ├── auth.ts             # Additional auth utilities
│   │   └── rateLimiter.ts      # Rate limiting middleware
│   ├── tools/                  # Tool registration system
│   │   └── register-tools.ts   # Central tool registry ← UNDERSTAND THIS
│   └── types.ts                # TypeScript type definitions
├── PRPs/
│   ├── templates/              # PRP templates
│   │   ├── prp_mcp_base.md     # Base template
│   │   └── prp_ns_mcp.md       # NS-specific template
│   └── ai_docs/                # Implementation guides ← READ ALL
│       ├── mcp_patterns.md     # Core MCP patterns
│       ├── claude_api_usage.md # Anthropic API usage
│       ├── nsapp-stations-api.json      # NS Stations API spec
│       ├── spoorkaart-api.json          # Route/disruption API spec
│       └── reisinformatie-api.json      # Travel info API spec (large)
├── examples/                   # Example tool implementations
│   ├── database-tools.ts       # Database tools example ← FOLLOW PATTERN
│   └── database-tools-sentry.ts # With Sentry monitoring
├── tests/                      # Test infrastructure
│   ├── unit/                   # Unit tests
│   ├── fixtures/               # Test fixtures
│   └── mocks/                  # Mock implementations
├── wrangler.jsonc              # Cloudflare config ← COPY PATTERNS
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
└── CLAUDE.md                   # Implementation guide (this file)
```

### Desired Codebase Tree (Files to add/modify)

```bash
# New files to create for NS + PRP management functionality
├── src/
│   ├── api/                    # External API integrations
│   │   ├── ns-stations.ts      # NS Stations API client
│   │   ├── spoorkaart.ts       # SpoorKaart API client  
│   │   ├── reisinformatie.ts   # Travel info API client
│   │   └── anthropic.ts        # Anthropic AI API client
│   ├── tools/                  # Extended tool registration
│   │   ├── ns-tools.ts         # NS API tools registration
│   │   ├── prp-tools.ts        # PRP management tools
│   │   ├── task-tools.ts       # Task CRUD tools
│   │   ├── tag-tools.ts        # Tag management tools
│   │   └── register-tools.ts   # Updated central registry
│   ├── database/
│   │   ├── schema.sql          # Enhanced database schema for PRP/tasks
│   │   ├── prp-operations.ts   # PRP-specific database operations
│   │   └── task-operations.ts  # Task-specific database operations
│   ├── lib/
│   │   ├── prp-parser.ts       # AI-powered PRP parsing logic
│   │   ├── validation.ts       # Enhanced Zod schemas
│   │   └── response-helpers.ts # Standardized response formatting
│   └── types/
│       ├── ns-api.ts           # NS API response types
│       ├── prp.ts              # PRP and task types
│       └── anthropic.ts        # Anthropic API types
```

### Enhanced Database Schema

```sql
-- PRPs table for storing requirement documents
CREATE TABLE prps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  goals TEXT,
  target_users TEXT,
  created_by VARCHAR(100) NOT NULL, -- GitHub username
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'draft'
);

-- Tasks extracted from PRPs or created manually
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  prp_id UUID REFERENCES prps(id) ON DELETE SET NULL,
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(50) DEFAULT 'pending',
  assigned_to VARCHAR(100), -- GitHub username
  created_by VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP
);

-- Tags for organizing tasks and PRPs
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  color VARCHAR(7), -- Hex color code
  created_by VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Task-Tag relationships
CREATE TABLE task_tags (
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, tag_id)
);

-- Documentation attached to tasks
CREATE TABLE task_documentation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_by VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PRP parsing history and AI metadata
CREATE TABLE prp_parsing_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prp_id UUID REFERENCES prps(id) ON DELETE CASCADE,
  model_used VARCHAR(100) NOT NULL,
  tasks_extracted INTEGER DEFAULT 0,
  parsing_success BOOLEAN DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Known Gotchas & Critical Patterns

```typescript
// CRITICAL: Enhanced environment interface for new requirements
interface Env {
  DATABASE_URL: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  COOKIE_ENCRYPTION_KEY: string;
  OAUTH_KV: KVNamespace;
  
  // NS API Configuration
  NS_API_KEY: string; // Ocp-Apim-Subscription-Key for NS APIs
  
  // Anthropic AI Configuration
  ANTHROPIC_API_KEY: string;
  ANTHROPIC_MODEL: string; // e.g., "claude-3-5-sonnet-20241022"
  
  // Optional monitoring
  SENTRY_DSN?: string;
}

// CRITICAL: User permission levels for enhanced functionality
const USER_PERMISSIONS = {
  ADMIN: new Set(['admin_user']), // Full access including user management
  PRIVILEGED: new Set(['privileged_user', 'project_manager']), // Write access to tasks/PRPs
  READ_ONLY: new Set(['readonly_user', 'viewer']) // Read-only access to data
} as const;

// CRITICAL: Anthropic API integration pattern
async function parseWithAnthropic(prpContent: string, apiKey: string, model: string) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: model,
      max_tokens: 3000,
      messages: [{
        role: 'user',
        content: buildPRPParsingPrompt(prpContent)
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`);
  }

  const result = await response.json();
  return JSON.parse(result.content[0].text);
}

// CRITICAL: NS API integration with proper authentication
async function callNSAPI(endpoint: string, params: Record<string, any>, apiKey: string) {
  const url = new URL(endpoint);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString(), {
    headers: {
      'Ocp-Apim-Subscription-Key': apiKey,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`NS API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

// CRITICAL: Enhanced database operations with transactions
async function createTasksFromPRP(prpId: string, tasks: ParsedTask[], db: postgres.Sql) {
  return await db.begin(async (transaction) => {
    const createdTasks = [];
    
    for (const task of tasks) {
      const [created] = await transaction`
        INSERT INTO tasks (title, description, prp_id, priority, created_by)
        VALUES (${task.title}, ${task.description}, ${prpId}, ${task.priority || 'medium'}, ${task.createdBy})
        RETURNING *
      `;
      createdTasks.push(created);
    }
    
    // Update PRP parsing history
    await transaction`
      INSERT INTO prp_parsing_history (prp_id, model_used, tasks_extracted, parsing_success)
      VALUES (${prpId}, ${task.modelUsed}, ${tasks.length}, true)
    `;
    
    return createdTasks;
  });
}
```

## Implementation Blueprint

### Data Models & Types

```typescript
// Enhanced user props with permission levels
type Props = {
  login: string;
  name: string;
  email: string;
  accessToken: string;
  permissions: 'admin' | 'privileged' | 'read-only';
};

// PRP and Task data models
interface PRP {
  id: string;
  title: string;
  content: string;
  goals?: string;
  targetUsers?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'active' | 'completed' | 'archived';
}

interface Task {
  id: string;
  title: string;
  description?: string;
  prpId?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  assignedTo?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags?: Tag[];
  documentation?: TaskDocumentation[];
}

interface Tag {
  id: string;
  name: string;
  color?: string;
  createdBy: string;
  createdAt: Date;
}

// NS API response types
interface NSStationV3 {
  id: {
    uicCode: string;
    code: string;
  };
  names: {
    long: string;
    medium: string;
    short: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  stationType: string;
  country: string;
}

// Zod validation schemas
import { z } from "zod";

const PRPParsingSchema = z.object({
  prpId: z.string().uuid(),
  content: z.string().min(100, "PRP content too short for meaningful parsing"),
  extractGoals: z.boolean().default(true),
  extractTargetUsers: z.boolean().default(true)
});

const TaskCreationSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  prpId: z.string().uuid().optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  assignedTo: z.string().optional(),
  dueDate: z.string().datetime().optional()
});

const NSStationSearchSchema = z.object({
  q: z.string().min(2).optional(),
  limit: z.number().int().min(1).max(100).default(10),
  countryCodes: z.array(z.string()).optional(),
  includeNonPlannableStations: z.boolean().default(false)
});
```

### List of Tasks (Complete in order)

```yaml
Task 1 - Enhanced Project Setup:
  UPDATE existing configuration:
    - MODIFY wrangler.jsonc to add new environment variables
    - UPDATE .dev.vars.example with NS_API_KEY, ANTHROPIC_API_KEY, ANTHROPIC_MODEL
    - INSTALL additional dependencies: axios for HTTP requests, @anthropic-ai/sdk if preferred

  CREATE new environment variables:
    - ADD NS_API_KEY for NS API authentication
    - ADD ANTHROPIC_API_KEY for AI parsing capabilities
    - ADD ANTHROPIC_MODEL for model selection (default: claude-3-5-sonnet-20241022)

Task 2 - Database Schema Enhancement:
  CREATE enhanced database schema:
    - RUN the provided schema.sql to create PRPs, tasks, tags, and related tables
    - ADD indexes for performance on frequently queried columns
    - CREATE database migration script if needed

  UPDATE database operations:
    - EXTEND existing database utilities for new table operations
    - CREATE prp-operations.ts for PRP-specific database functions
    - CREATE task-operations.ts for task management functions
    - IMPLEMENT transaction support for multi-table operations

Task 3 - External API Integration:
  CREATE NS API client modules:
    - CREATE src/api/ns-stations.ts for Stations API integration
    - CREATE src/api/spoorkaart.ts for route and disruption data
    - CREATE src/api/reisinformatie.ts for travel information (handle large responses)
    - IMPLEMENT proper error handling and rate limiting for each API

  CREATE Anthropic API integration:
    - CREATE src/api/anthropic.ts for AI parsing functionality
    - IMPLEMENT PRP parsing prompt generation
    - ADD structured JSON output parsing with validation
    - HANDLE API errors and fallback strategies

Task 4 - Enhanced MCP Tool Registration:
  CREATE modular tool files:
    - CREATE src/tools/ns-tools.ts for NS API tools
    - CREATE src/tools/prp-tools.ts for PRP management
    - CREATE src/tools/task-tools.ts for task CRUD operations
    - CREATE src/tools/tag-tools.ts for tag management

  UPDATE central tool registry:
    - MODIFY src/tools/register-tools.ts to import and register all new tools
    - IMPLEMENT permission-based tool registration
    - ADD proper error handling and logging for each tool

Task 5 - Core Business Logic Implementation:
  CREATE PRP parsing logic:
    - CREATE src/lib/prp-parser.ts with Anthropic integration
    - IMPLEMENT task extraction from PRP content
    - ADD metadata extraction (goals, target users)
    - CREATE parsing history tracking

  CREATE task management logic:
    - IMPLEMENT full CRUD operations for tasks
    - ADD tag assignment and filtering capabilities
    - CREATE documentation attachment system
    - ADD task status workflow management

Task 6 - Enhanced Validation and Error Handling:
  CREATE comprehensive validation:
    - CREATE src/lib/validation.ts with all Zod schemas
    - IMPLEMENT input validation for all new tools
    - ADD response formatting utilities in src/lib/response-helpers.ts
    - CREATE standardized error responses

  UPDATE security measures:
    - EXTEND permission checking for new operations
    - ADD API key validation for NS API calls
    - IMPLEMENT rate limiting for AI parsing operations
    - ADD audit logging for sensitive operations

Task 7 - Testing Infrastructure:
  CREATE comprehensive tests:
    - ADD unit tests for all new API integrations
    - CREATE integration tests for PRP parsing workflow
    - ADD database operation tests with transaction support
    - IMPLEMENT mock services for external APIs

  UPDATE existing tests:
    - EXTEND existing test fixtures for new data models
    - ADD permission-based access tests
    - CREATE end-to-end workflow tests

Task 8 - Enhanced MCP Server Configuration:
  UPDATE main server files:
    - MODIFY src/index.ts to integrate all new functionality
    - UPDATE src/index_sentry.ts with enhanced monitoring
    - ADD new environment variable handling
    - IMPLEMENT enhanced user permission system

  CREATE additional utilities:
    - ADD configuration validation on startup
    - IMPLEMENT health check endpoints
    - CREATE usage analytics and monitoring

Task 9 - Local Development Testing:
  TEST complete functionality:
    - VERIFY all NS API integrations work correctly
    - TEST Anthropic AI parsing with sample PRPs
    - VALIDATE all CRUD operations for tasks and PRPs
    - VERIFY permission systems work as expected
    - TEST error handling and recovery scenarios

Task 10 - Production Deployment:
  PREPARE for production:
    - SET all required Cloudflare Workers secrets
    - CONFIGURE database connection pooling settings
    - SET up monitoring and alerting
    - DEPLOY with comprehensive smoke tests
    - VALIDATE all functionality in production environment
```

### Per Task Implementation Details

```typescript
// Task 4 - Example Tool Implementation Pattern
// src/tools/prp-tools.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Props } from "../types";
import { z } from "zod";
import { parseWithAnthropic } from "../api/anthropic";
import { createPRP, updatePRP, getPRPById } from "../database/prp-operations";

const PRIVILEGED_USERS = new Set(['admin_user', 'project_manager']);

export function registerPRPTools(server: McpServer, env: Env, props: Props) {
  // Available to all authenticated users
  server.tool(
    "listPRPs",
    "Get all PRPs with optional filtering",
    {
      status: z.enum(['draft', 'active', 'completed', 'archived']).optional(),
      createdBy: z.string().optional(),
      limit: z.number().int().min(1).max(100).default(20),
      offset: z.number().int().min(0).default(0)
    },
    async ({ status, createdBy, limit, offset }) => {
      try {
        return await withDatabase(env.DATABASE_URL, async (db) => {
          let query = db`SELECT * FROM prps WHERE 1=1`;
          
          if (status) query = db`${query} AND status = ${status}`;
          if (createdBy) query = db`${query} AND created_by = ${createdBy}`;
          
          const prps = await db`${query} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
          
          return {
            content: [{
              type: "text",
              text: `**PRPs Found:** ${prps.length}\n\n${formatPRPList(prps)}`
            }]
          };
        });
      } catch (error) {
        return createErrorResponse(`Failed to list PRPs: ${error.message}`);
      }
    }
  );

  // Only for privileged users
  if (PRIVILEGED_USERS.has(props.login)) {
    server.tool(
      "parsePRP",
      "Use AI to extract tasks from a PRP document",
      PRPParsingSchema,
      async ({ prpId, content, extractGoals, extractTargetUsers }) => {
        try {
          // Parse with Anthropic
          const parsed = await parseWithAnthropic(
            content, 
            env.ANTHROPIC_API_KEY, 
            env.ANTHROPIC_MODEL
          );

          // Save extracted tasks to database
          return await withDatabase(env.DATABASE_URL, async (db) => {
            const tasks = await createTasksFromPRP(prpId, parsed.tasks, props.login, db);
            
            return {
              content: [{
                type: "text",
                text: `**PRP Parsing Complete**\n\n**Tasks Extracted:** ${tasks.length}\n\n**Tasks Created:**\n${formatTaskList(tasks)}`
              }]
            };
          });
        } catch (error) {
          return createErrorResponse(`PRP parsing failed: ${error.message}`);
        }
      }
    );
  }
}

// Task 4 - NS API Tools Implementation
// src/tools/ns-tools.ts
export function registerNSTools(server: McpServer, env: Env, props: Props) {
  server.tool(
    "getStationsV3",
    "Search for Dutch railway stations using NS API V3",
    NSStationSearchSchema,
    async ({ q, limit, countryCodes, includeNonPlannableStations }) => {
      try {
        const stations = await callNSAPI(
          'https://gateway.apiportal.ns.nl/nsapp-stations/v3',
          { q, limit, countryCodes, includeNonPlannableStations },
          env.NS_API_KEY
        );

        return {
          content: [{
            type: "text",
            text: `**Stations Found:** ${stations.payload.length}\n\n${formatStationList(stations.payload)}`
          }]
        };
      } catch (error) {
        return createErrorResponse(`NS API request failed: ${error.message}`);
      }
    }
  );

  server.tool(
    "getNearestStationsV3",
    "Find nearest railway stations to given coordinates",
    {
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
      limit: z.number().int().min(1).max(20).default(5),
      includeNonPlannableStations: z.boolean().default(false)
    },
    async ({ lat, lng, limit, includeNonPlannableStations }) => {
      try {
        const stations = await callNSAPI(
          'https://gateway.apiportal.ns.nl/nsapp-stations/v3/nearest',
          { lat, lng, limit, includeNonPlannableStations },
          env.NS_API_KEY
        );

        return {
          content: [{
            type: "text",
            text: `**Nearest Stations to (${lat}, ${lng}):**\n\n${formatStationList(stations.payload)}`
          }]
        };
      } catch (error) {
        return createErrorResponse(`NS API request failed: ${error.message}`);
      }
    }
  );
}
```

### Integration Points

```yaml
CLOUDFLARE_WORKERS:
  - wrangler.jsonc: Add NS_API_KEY, ANTHROPIC_API_KEY, ANTHROPIC_MODEL to environment
  - Durable Objects: Enhanced MCP agent binding for complex state management
  - KV Storage: OAuth state plus optional caching for NS API responses
  - Secrets: All API keys stored as Cloudflare Workers secrets

GITHUB_OAUTH:
  - Enhanced permission system: admin, privileged, read-only access levels
  - User context: GitHub login mapped to permission levels
  - Session management: Extended session data with permission caching

DATABASE:
  - Enhanced PostgreSQL schema: PRPs, tasks, tags, documentation, parsing history
  - Connection pooling: Optimized for increased concurrent operations
  - Transactions: Multi-table operations for complex workflows
  - Indexing: Performance optimization for frequent queries

EXTERNAL_APIS:
  - NS Stations API: Station search and location services
  - SpoorKaart API: Route geometry and disruption information  
  - ReisinformatieAPI: Comprehensive travel information (handle large responses)
  - Anthropic API: AI-powered PRP parsing and task extraction

ENVIRONMENT_VARIABLES:
  - Development: .dev.vars with all API keys and configuration
  - Production: Cloudflare Workers secrets
  - Required: DATABASE_URL, GITHUB_CLIENT_*, COOKIE_ENCRYPTION_KEY, NS_API_KEY, ANTHROPIC_API_KEY, ANTHROPIC_MODEL
  - Optional: SENTRY_DSN for monitoring

RATE_LIMITING:
  - NS API: Respect rate limits and implement backoff strategies
  - Anthropic API: Cost-conscious usage with request validation
  - MCP Tools: Per-user rate limiting for expensive operations
```

## Validation Gate

### Level 1: TypeScript & Configuration

```bash
# CRITICAL: Run these FIRST - fix any errors before proceeding
npm run type-check                 # TypeScript compilation with new types
wrangler types                     # Generate Cloudflare Workers types
npm run lint                       # ESLint validation

# Expected: No TypeScript errors, no linting issues
# If errors: Fix type issues, missing interfaces, import problems, add type definitions
```

### Level 2: Database Setup & Validation

```bash
# Create and validate database schema
psql $DATABASE_URL -f src/database/schema.sql

# Test database connections and operations
npm run test:database             # Database integration tests

# Expected: Schema created successfully, all tables accessible
# If errors: Check DATABASE_URL, fix schema issues, validate permissions
```

### Level 3: External API Integration Testing

```bash
# Test NS API integration
curl -H "Ocp-Apim-Subscription-Key: $NS_API_KEY" \
  "https://gateway.apiportal.ns.nl/nsapp-stations/v3?q=amsterdam&limit=5"

# Test Anthropic API integration  
curl -X POST https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{"model":"claude-3-5-sonnet-20241022","max_tokens":100,"messages":[{"role":"user","content":"Hello"}]}'

# Expected: Valid responses from both APIs
# If errors: Check API keys, rate limits, network connectivity
```

### Level 4: Local Development Testing

```bash
# Start local development server
wrangler dev

# Test OAuth flow (should redirect to GitHub)
curl -v http://localhost:8787/authorize

# Test MCP endpoint (should return server info)
curl -v http://localhost:8787/mcp

# Test tool functionality with MCP Inspector
npx @modelcontextprotocol/inspector@latest http://localhost:8787/mcp

# Expected: Server starts, OAuth redirects, MCP tools accessible
# If errors: Check console output, verify environment variables, fix configuration
```

### Level 5: Unit and Integration Testing

```bash
# Run comprehensive test suite
npm run test                      # All unit tests
npm run test:integration         # Integration tests
npm run test:e2e                 # End-to-end workflow tests

# Expected: All tests pass with good coverage
# If errors: Fix failing tests, update mocks, validate test data
```

## Final Validation Checklist

### Core Functionality

- [ ] TypeScript compilation: `npm run type-check` passes
- [ ] Database schema: All tables created and accessible
- [ ] External APIs: NS and Anthropic APIs respond correctly
- [ ] Local server starts: `wrangler dev` runs without errors
- [ ] MCP endpoint responds: `curl http://localhost:8787/mcp` returns server info
- [ ] OAuth flow works: Authentication redirects and completes successfully

### NS API Integration

- [ ] Station search tools return correct data from NS API
- [ ] Nearest station lookup works with coordinates
- [ ] Route geometry retrieval from SpoorKaart API
- [ ] Disruption information accessible
- [ ] Proper error handling for API failures and rate limits

### AI-Powered PRP Management

- [ ] Anthropic API integration extracts tasks from PRPs
- [ ] PRP parsing creates proper database records
- [ ] Task extraction includes metadata (goals, target users)
- [ ] Parsing history tracked correctly
- [ ] Error handling for AI parsing failures

### Task Management System

- [ ] Full CRUD operations work for tasks, PRPs, and tags
- [ ] Task assignment and status updates function correctly
- [ ] Documentation attachment system operational
- [ ] Tag-based filtering and organization works
- [ ] Permission-based access control enforced

### Security & Performance

- [ ] User permissions prevent unauthorized access to sensitive operations
- [ ] SQL injection protection active for all database operations
- [ ] API key validation working for external service calls
- [ ] Rate limiting prevents abuse of expensive operations
- [ ] Error messages don't leak sensitive system information

### Production Readiness

- [ ] All required secrets configured in Cloudflare Workers
- [ ] Monitoring and logging active (Sentry integration if used)
- [ ] Database connection pooling optimized for production load
- [ ] Health checks and status endpoints functional
- [ ] Comprehensive test coverage achieved

---

## Anti-Patterns to Avoid

### MCP-Specific

- ❌ Don't skip input validation with Zod - always validate tool parameters
- ❌ Don't forget to implement cleanup() method for Durable Objects
- ❌ Don't hardcode API keys - use environment variables and secrets
- ❌ Don't ignore rate limiting - implement proper backoff strategies

### Database Operations

- ❌ Don't skip transaction usage for multi-table operations
- ❌ Don't ignore SQL injection protection - validate all queries
- ❌ Don't skip connection pooling - use withDatabase wrapper consistently
- ❌ Don't expose sensitive data in error messages

### AI Integration

- ❌ Don't send sensitive data to external AI services without user consent
- ❌ Don't ignore AI parsing failures - implement proper fallback strategies
- ❌ Don't skip prompt engineering - craft clear, structured prompts
- ❌ Don't ignore token limits and costs - validate input size

### Development Process

- ❌ Don't skip the validation loops - each level catches different issues
- ❌ Don't deploy without comprehensive testing
- ❌ Don't ignore TypeScript errors - fix all type issues before deployment
- ❌ Don't skip permission testing - validate access control scenarios

This comprehensive PRP provides all the context, patterns, and implementation details needed to build a production-ready MCP server that combines NS Railways API access with intelligent PRP management and task extraction capabilities.