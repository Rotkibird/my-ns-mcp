---
name: "NS PRP Management MCP Server"
description: A comprehensive MCP server providing Dutch Railways API access with AI-powered PRP parsing and task management capabilities.
---

## Purpose

Production-ready MCP server that combines Dutch Railways (NS) API access with comprehensive task and documentation management. Uses API key authentication, PostgreSQL database, and provides complete CRUD operations for tasks, documentation, and project organization.

## Core Principles

1. **Context is King**: Include all NS API patterns, PRP parsing logic, and database management capabilities
2. **Validation Loops**: Comprehensive testing from TypeScript compilation to production deployment
3. **Security First**: API key authentication with role-based access, SQL injection protection, API key management
4. **Production Ready**: Cloudflare Workers deployment with monitoring and error handling
5. **Data Management**: Comprehensive task and documentation organization with tagging system

---

## Goal

Build a production-ready MCP (Model Context Protocol) server with:

- **NS Railways API Integration** - Secure access to Dutch public transport data
- **Task Management System** - Complete CRUD operations for tasks, documentation, and tags
- **API Key Authentication** - Role-based access control with user permissions
- **PostgreSQL Database** - Structured storage for tasks, projects, and metadata
- **Cloudflare Workers Deployment** - Global edge deployment with monitoring

## Why

- **Developer Productivity**: Enable AI assistants to manage Dutch transport data and project requirements
- **Enterprise Security**: API key authentication with granular permission system and secure API key management
- **Streamlined Workflow**: Organized task and documentation management with tagging and filtering
- **Scalability**: Cloudflare Workers global edge deployment with database connection pooling
- **Integration**: Bridge between NS public APIs and internal project management systems
- **User Value**: Comprehensive task management with Dutch transport data integration

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

**Project Management:**
- `listProjects` - Get all projects stored in database
- `getProjectById` - Retrieve specific project with metadata
- `createProject` - Create new project with goals and descriptions
- `updateProject` - Modify project goals, target users, descriptions

**Task Management:**
- `listTasks` - Get all tasks with filtering and pagination
- `getTaskById` - Retrieve specific task with full details
- `createTask` - Create new task manually with full details
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

- API key authentication with validation middleware
- Role-based access control (read-only vs privileged users vs admin)
- User context propagation to all MCP tools
- Secure API key management and validation
- Request-level authentication for all operations

**Database Integration:**

- PostgreSQL with enhanced schema for PRP/task management
- Connection pooling optimized for Cloudflare Workers
- SQL injection protection and query validation
- Transaction support for multi-table operations
- Read/write operation separation based on user permissions

**Data Organization:**

- Comprehensive tagging system for tasks and projects
- Advanced filtering and search capabilities
- Structured data export and import functionality
- Project timeline and milestone tracking
- Automated status reporting and metrics

**Deployment & Monitoring:**

- Cloudflare Workers with Durable Objects for state management
- Optional Sentry integration for error tracking and performance monitoring
- Environment-based configuration (development vs production)
- Real-time logging and alerting
- API rate limiting and usage monitoring

### Success Criteria

- [ ] MCP server passes validation with MCP Inspector
- [ ] API key authentication flow works end-to-end (key validation → MCP access)
- [ ] TypeScript compilation succeeds with no errors
- [ ] All NS API integrations return correct data with proper error handling
- [ ] Task and project management system works with full CRUD operations
- [ ] Database CRUD operations work for tasks, projects, and tags
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

# TOOL REGISTRATION SYSTEM - Understand the modular approach
- file: src/tools/register-tools.ts
  why: Central registry showing how all tools are imported and registered - STUDY this pattern

# EXISTING MCP IMPLEMENTATION - Core patterns to follow
- file: src/index.ts
  why: Complete MCP server with authentication, database, and tools - MIRROR this pattern

- file: src/index_sentry.ts
  why: Sentry-enabled version for production monitoring - USE for production deployment

# AUTHENTICATION PATTERNS - API Key implementation
- file: src/server/auth.ts
  why: API key authentication implementation - USE this exact pattern for authentication

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
│   ├── server/                 # Server utilities
│   │   ├── auth.ts             # API key authentication ← USE THIS PATTERN
│   │   └── rateLimiter.ts      # Rate limiting middleware
│   ├── database/               # Database integration
│   │   ├── connection.ts       # Connection pooling ← CONNECTION PATTERNS
│   │   ├── security.ts         # SQL validation ← SECURITY CRITICAL
│   │   └── utils.ts            # Database utilities ← ERROR HANDLING
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
│   │   └── reisinformatie.ts   # Travel info API client
│   ├── tools/                  # Extended tool registration
│   │   ├── ns-tools.ts         # NS API tools registration
│   │   ├── project-tools.ts    # Project management tools
│   │   ├── task-tools.ts       # Task CRUD tools
│   │   ├── tag-tools.ts        # Tag management tools
│   │   └── register-tools.ts   # Updated central registry
│   ├── database/
│   │   ├── schema.sql          # Enhanced database schema for projects/tasks
│   │   ├── project-operations.ts # Project-specific database operations
│   │   └── task-operations.ts  # Task-specific database operations
│   ├── lib/
│   │   ├── validation.ts       # Enhanced Zod schemas
│   │   ├── response-helpers.ts # Standardized response formatting
│   │   └── data-export.ts      # Data export and import utilities
│   └── types/
│       ├── ns-api.ts           # NS API response types
│       └── project.ts          # Project and task types
```

### Enhanced Database Schema

```sql
-- Projects table for storing project information
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  goals TEXT,
  target_users TEXT,
  created_by VARCHAR(100) NOT NULL, -- API key identifier or user ID
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active'
);

-- Tasks for projects, created manually
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(50) DEFAULT 'pending',
  assigned_to VARCHAR(100), -- User identifier
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

-- API key permissions mapping
CREATE TABLE api_key_permissions (
  api_key_hash VARCHAR(255) PRIMARY KEY,
  permissions VARCHAR(50) NOT NULL, -- 'admin', 'privileged', 'read-only'
  user_identifier VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP
);
```

### Known Gotchas & Critical Patterns

```typescript
// CRITICAL: Enhanced environment interface for new requirements
interface Env {
  DATABASE_URL: string;
  VALID_API_KEYS: string; // Comma-separated list of valid API keys
  
  // NS API Configuration
  NS_API_KEY: string; // Ocp-Apim-Subscription-Key for NS APIs
  
  // Optional monitoring
  SENTRY_DSN?: string;
}

// CRITICAL: User permission levels for enhanced functionality
const USER_PERMISSIONS = {
  ADMIN: new Set(['admin_user']), // Full access including user management
  PRIVILEGED: new Set(['privileged_user', 'project_manager']), // Write access to tasks/PRPs
  READ_ONLY: new Set(['readonly_user', 'viewer']) // Read-only access to data
} as const;

// CRITICAL: API key authentication pattern (from auth.ts)
const validKeys = process.env.VALID_API_KEYS
  ? process.env.VALID_API_KEYS.split(",").map(key => key.trim())
  : [
      "abc123xyz", // fallback for dev/test
      "def456uvw",
    ];

export function validateApiKey(apiKey?: string): void {
  if (!apiKey) {
    throw new Error("Unauthorized: Missing API key");
  }

  if (!validKeys.includes(apiKey)) {
    throw new Error("Unauthorized: Invalid API key");
  }
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
async function createTasksForProject(projectId: string, tasks: TaskData[], userId: string, db: postgres.Sql) {
  return await db.begin(async (transaction) => {
    const createdTasks = [];
    
    for (const task of tasks) {
      const [created] = await transaction`
        INSERT INTO tasks (title, description, project_id, priority, created_by)
        VALUES (${task.title}, ${task.description}, ${projectId}, ${task.priority || 'medium'}, ${userId})
        RETURNING *
      `;
      createdTasks.push(created);
    }
    
    return createdTasks;
  });
}
```

## Implementation Blueprint

### Data Models & Types

```typescript
// Enhanced user props with API key-based authentication
type Props = {
  apiKey: string;
  userIdentifier: string;
  permissions: 'admin' | 'privileged' | 'read-only';
};

// Project and Task data models
interface Project {
  id: string;
  title: string;
  description: string;
  goals?: string;
  targetUsers?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'completed' | 'archived' | 'on-hold';
}

interface Task {
  id: string;
  title: string;
  description?: string;
  projectId?: string;
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

const ProjectCreationSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(10, "Project description should be descriptive"),
  goals: z.string().optional(),
  targetUsers: z.string().optional(),
  status: z.enum(['active', 'completed', 'archived', 'on-hold']).default('active')
});

const TaskCreationSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  projectId: z.string().uuid().optional(),
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
    - UPDATE .dev.vars.example with VALID_API_KEYS, NS_API_KEY
    - INSTALL additional dependencies: axios for HTTP requests

  CREATE new environment variables:
    - ADD VALID_API_KEYS for API key authentication
    - ADD NS_API_KEY for NS API authentication

Task 2 - Database Schema Enhancement:
  CREATE enhanced database schema:
    - RUN the provided schema.sql to create projects, tasks, tags, and related tables
    - ADD api_key_permissions table for API key management
    - ADD indexes for performance on frequently queried columns
    - CREATE database migration script if needed

  UPDATE database operations:
    - EXTEND existing database utilities for new table operations
    - CREATE project-operations.ts for project-specific database functions
    - CREATE task-operations.ts for task management functions
    - IMPLEMENT transaction support for multi-table operations

Task 3 - External API Integration:
  CREATE NS API client modules:
    - CREATE src/api/ns-stations.ts for Stations API integration
    - CREATE src/api/spoorkaart.ts for route and disruption data
    - CREATE src/api/reisinformatie.ts for travel information (handle large responses)
    - IMPLEMENT proper error handling and rate limiting for each API
    - ADD data caching strategies for frequently requested information

Task 4 - Enhanced MCP Tool Registration:
  CREATE modular tool files:
    - CREATE src/tools/ns-tools.ts for NS API tools
    - CREATE src/tools/project-tools.ts for project management
    - CREATE src/tools/task-tools.ts for task CRUD operations
    - CREATE src/tools/tag-tools.ts for tag management

  UPDATE central tool registry:
    - MODIFY src/tools/register-tools.ts to import and register all new tools
    - IMPLEMENT permission-based tool registration using API key authentication
    - ADD proper error handling and logging for each tool

Task 5 - Core Business Logic Implementation:
  CREATE project management logic:
    - CREATE src/lib/data-export.ts for data export/import functionality
    - IMPLEMENT project timeline and milestone tracking
    - ADD project status workflow management
    - CREATE project analytics and reporting features

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
    - EXTEND permission checking for new operations using API key system
    - ADD API key validation for NS API calls
    - IMPLEMENT rate limiting for expensive database operations
    - ADD audit logging for sensitive operations

Task 7 - Testing Infrastructure:
  CREATE comprehensive tests:
    - ADD unit tests for all new API integrations
    - CREATE integration tests for project management workflow
    - ADD database operation tests with transaction support
    - IMPLEMENT mock services for external APIs

  UPDATE existing tests:
    - EXTEND existing test fixtures for new data models
    - ADD permission-based access tests using API keys
    - CREATE end-to-end workflow tests

Task 8 - Enhanced MCP Server Configuration:
  UPDATE main server files:
    - MODIFY src/index.ts to integrate all new functionality with API key authentication
    - UPDATE src/index_sentry.ts with enhanced monitoring
    - ADD new environment variable handling
    - IMPLEMENT enhanced user permission system based on API keys

  CREATE additional utilities:
    - ADD configuration validation on startup
    - IMPLEMENT health check endpoints
    - CREATE usage analytics and monitoring

Task 9 - Local Development Testing:
  TEST complete functionality:
    - VERIFY all NS API integrations work correctly
    - TEST project management functionality with sample data
    - VALIDATE all CRUD operations for tasks and projects
    - VERIFY permission systems work as expected with API keys
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
// src/tools/project-tools.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Props } from "../types";
import { z } from "zod";
import { createProject, updateProject, getProjectById } from "../database/project-operations";
import { validateApiKey } from "../server/auth";

const PRIVILEGED_PERMISSIONS = new Set(['admin', 'privileged']);

export function registerProjectTools(server: McpServer, env: Env, props: Props) {
  // Available to all authenticated users
  server.tool(
    "listProjects",
    "Get all projects with optional filtering",
    {
      status: z.enum(['active', 'completed', 'archived', 'on-hold']).optional(),
      createdBy: z.string().optional(),
      limit: z.number().int().min(1).max(100).default(20),
      offset: z.number().int().min(0).default(0)
    },
    async ({ status, createdBy, limit, offset }) => {
      try {
        validateApiKey(props.apiKey);
        
        return await withDatabase(env.DATABASE_URL, async (db) => {
          let query = db`SELECT * FROM projects WHERE 1=1`;
          
          if (status) query = db`${query} AND status = ${status}`;
          if (createdBy) query = db`${query} AND created_by = ${createdBy}`;
          
          const projects = await db`${query} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
          
          return {
            content: [{
              type: "text",
              text: `**Projects Found:** ${projects.length}\n\n${formatProjectList(projects)}`
            }]
          };
        });
      } catch (error) {
        return createErrorResponse(`Failed to list projects: ${error.message}`);
      }
    }
  );

  // Only for privileged users
  if (PRIVILEGED_PERMISSIONS.has(props.permissions)) {
    server.tool(
      "createProject",
      "Create a new project with goals and descriptions",
      ProjectCreationSchema,
      async ({ title, description, goals, targetUsers, status }) => {
        try {
          validateApiKey(props.apiKey);

          return await withDatabase(env.DATABASE_URL, async (db) => {
            const [project] = await db`
              INSERT INTO projects (title, description, goals, target_users, status, created_by)
              VALUES (${title}, ${description}, ${goals}, ${targetUsers}, ${status}, ${props.userIdentifier})
              RETURNING *
            `;
            
            return {
              content: [{
                type: "text",
                text: `**Project Created Successfully**\n\n**Title:** ${project.title}\n**Description:** ${project.description}\n**Status:** ${project.status}`
              }]
            };
          });
        } catch (error) {
          return createErrorResponse(`Project creation failed: ${error.message}`);
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
        validateApiKey(props.apiKey);
        
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
        validateApiKey(props.apiKey);
        
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
  - wrangler.jsonc: Add VALID_API_KEYS, NS_API_KEY to environment
  - Durable Objects: Enhanced MCP agent binding for complex state management
  - Secrets: All API keys stored as Cloudflare Workers secrets

API_KEY_AUTHENTICATION:
  - Enhanced permission system: admin, privileged, read-only access levels
  - User context: API key mapped to permission levels and user identifiers
  - Request validation: API key validation on every request

DATABASE:
  - Enhanced PostgreSQL schema: projects, tasks, tags, documentation, API key permissions
  - Connection pooling: Optimized for increased concurrent operations
  - Transactions: Multi-table operations for complex workflows
  - Indexing: Performance optimization for frequent queries

EXTERNAL_APIS:
  - NS Stations API: Station search and location services
  - SpoorKaart API: Route geometry and disruption information  
  - ReisinformatieAPI: Comprehensive travel information (handle large responses)

ENVIRONMENT_VARIABLES:
  - Development: .dev.vars with all API keys and configuration
  - Production: Cloudflare Workers secrets
  - Required: DATABASE_URL, VALID_API_KEYS, NS_API_KEY
  - Optional: SENTRY_DSN for monitoring

RATE_LIMITING:
  - NS API: Respect rate limits and implement backoff strategies
  - Database Operations: Connection pooling and query optimization
  - MCP Tools: Per-API-key rate limiting for expensive operations
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

# Expected: Valid response from NS API
# If errors: Check API keys, rate limits, network connectivity
```

### Level 4: Local Development Testing

```bash
# Start local development server
wrangler dev

# Test API key authentication (should return server info with valid key)
curl -H "x-api-key: abc123xyz" http://localhost:8787/mcp

# Test tool functionality with MCP Inspector
npx @modelcontextprotocol/inspector@latest http://localhost:8787/mcp

# Expected: Server starts, API key authentication works, MCP tools accessible
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
- [ ] External APIs: NS APIs respond correctly
- [ ] Local server starts: `wrangler dev` runs without errors
- [ ] MCP endpoint responds: `curl -H "x-api-key: validkey" http://localhost:8787/mcp` returns server info
- [ ] API key authentication: Valid keys accepted, invalid keys rejected

### NS API Integration

- [ ] Station search tools return correct data from NS API
- [ ] Nearest station lookup works with coordinates
- [ ] Route geometry retrieval from SpoorKaart API
- [ ] Disruption information accessible
- [ ] Proper error handling for API failures and rate limits

### Project Management System

- [ ] Project creation and management works correctly
- [ ] Project metadata (goals, target users) handled properly
- [ ] Project status workflows function as expected
- [ ] Data export and import functionality operational
- [ ] Project analytics and reporting features work

### Task Management System

- [ ] Full CRUD operations work for tasks, projects, and tags
- [ ] Task assignment and status updates function correctly
- [ ] Documentation attachment system operational
- [ ] Tag-based filtering and organization works
- [ ] Permission-based access control enforced

### Security & Performance

- [ ] User permissions prevent unauthorized access to sensitive operations
- [ ] SQL injection protection active for all database operations
- [ ] API key validation working for external service calls
- [ ] Rate limiting prevents abuse of database operations
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

### Data Management

- ❌ Don't skip data validation - validate all input data with Zod schemas
- ❌ Don't ignore export/import failures - implement proper error handling
- ❌ Don't skip data integrity checks - validate relationships between entities
- ❌ Don't ignore performance - optimize queries and use appropriate indexes

### Development Process

- ❌ Don't skip the validation loops - each level catches different issues
- ❌ Don't deploy without comprehensive testing
- ❌ Don't ignore TypeScript errors - fix all type issues before deployment
- ❌ Don't skip permission testing - validate access control scenarios

This comprehensive PRP provides all the context, patterns, and implementation details needed to build a production-ready MCP server that combines NS Railways API access with intelligent PRP management and task extraction capabilities using API key authentication instead of GitHub OAuth.