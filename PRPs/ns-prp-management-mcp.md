---
name: "NS Travel Information MCP Server"
description: A comprehensive MCP server providing AI agents with access to Dutch Railways (NS) API for travel planning and station information.
---

## Purpose

Production-ready MCP server that provides AI agents with seamless access to Dutch Railways (NS) API data for travel planning. Enables AI agents to query train stations, routes, disruptions, and travel information through a clear, standardized interface. Uses API key authentication and optimized data retrieval for real-time travel assistance.

## Core Principles

1. **Context is King**: Include all NS API patterns, PRP parsing logic, and database management capabilities
2. **Validation Loops**: Comprehensive testing from TypeScript compilation to production deployment
3. **Security First**: API key authentication with role-based access, SQL injection protection, API key management
4. **Production Ready**: Cloudflare Workers deployment with monitoring and error handling
5. **Data Management**: Comprehensive task and documentation organization with tagging system

---

## Goal

Build a production-ready MCP (Model Context Protocol) server with:

- **NS Railways API Integration** - Comprehensive access to Dutch train and station data
- **AI Agent Interface** - Clear, standardized tools for travel planning queries
- **Real-Time Information** - Current station data, routes, and service disruptions
- **API Key Authentication** - Secure access control for API usage
- **Cloudflare Workers Deployment** - Global edge deployment with caching and monitoring

## Why

- **AI Agent Empowerment**: Enable AI assistants to provide accurate, real-time Dutch travel information
- **Travel Planning**: Help users plan journeys with up-to-date station data, routes, and disruptions
- **Standardized Interface**: Provide clear, consistent API access that AI agents can easily understand
- **Real-Time Accuracy**: Deliver current information for reliable travel recommendations
- **Integration Ready**: Bridge between NS public APIs and AI travel planning applications
- **User Experience**: Enhance travel apps with comprehensive Dutch Railways data access

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

**Route & Journey Planning:**
- `getRouteGeometry` - Get detailed route geometry between stations
- `planJourney` - Get travel options between two locations
- `getJourneyDetails` - Get detailed information about a specific journey
- `getTransferOptions` - Find connection possibilities at interchange stations





**Authentication & Authorization:**

- API key authentication for secure access control
- Simple validation middleware for all requests
- Rate limiting to prevent API abuse
- Secure management of NS API credentials
- Request logging for monitoring and debugging

**Data Caching & Performance:**

- Intelligent caching of NS API responses
- Connection pooling for optimal performance
- Response compression for faster data transfer
- Error handling with fallback strategies
- Monitoring and alerting for service health

**Data Processing:**

- Real-time data parsing and formatting
- Standardized response structures for AI agents
- Multi-language support for station names
- Coordinate conversion and mapping utilities
- Travel time calculations and route optimization

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
- [ ] All NS API integrations return accurate travel data with proper error handling
- [ ] Station search and information retrieval works correctly
- [ ] Route planning and journey information functions properly

- [ ] Local development server starts and responds to travel queries
- [ ] Production deployment to Cloudflare Workers succeeds
- [ ] Rate limiting prevents API abuse while allowing normal travel queries
- [ ] Error handling provides clear messages for travel planning failures

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
  why: Complete MCP server with authentication and tools - MIRROR this pattern

- file: src/index_sentry.ts
  why: Sentry-enabled version for production monitoring - USE for production deployment

# AUTHENTICATION PATTERNS - API Key implementation
- file: src/server/auth.ts
  why: API key authentication implementation - USE this exact pattern for authentication

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
# New files to create for NS travel information functionality
├── src/
│   ├── api/                    # External API integrations
│   │   ├── ns-stations.ts      # NS Stations API client
│   │   ├── spoorkaart.ts       # SpoorKaart API client (routes, disruptions)
│   │   └── reisinformatie.ts   # Travel info API client (journey planning)
│   ├── tools/                  # Travel-focused tool registration
│   │   ├── station-tools.ts    # Station search and information tools
│   │   ├── journey-tools.ts    # Journey planning and route tools
│   │   ├── service-tools.ts    # Service status and disruption tools
│   │   ├── travel-tools.ts     # Travel advice and information tools
│   │   └── register-tools.ts   # Updated central registry
│   ├── lib/
│   │   ├── validation.ts       # Zod schemas for travel data
│   │   ├── response-helpers.ts # Standardized response formatting
│   │   ├── data-cache.ts       # Caching utilities for NS API responses
│   │   └── travel-utils.ts     # Travel calculation and conversion utilities
│   └── types/
│       ├── ns-api.ts           # NS API response types
│       ├── station.ts          # Station and facility types
│       ├── journey.ts          # Journey and route types
│       └── service.ts          # Service status and disruption types
```

### Data Caching Strategy

The MCP server is stateless and queries NS APIs directly. Optional caching can be implemented for performance:

```typescript
// Optional caching for frequently requested data
interface CacheConfig {
  stationList: { ttl: 3600 },      // Cache station list for 1 hour
  stationDetails: { ttl: 1800 },   // Cache station details for 30 minutes  
  disruptions: { ttl: 300 },       // Cache disruptions for 5 minutes
  journeyPlans: { ttl: 600 },      // Cache journey plans for 10 minutes
  routeGeometry: { ttl: 86400 }    // Cache route geometry for 24 hours
}

// Simple in-memory cache for Cloudflare Workers
const cache = new Map<string, { data: any, expires: number }>();
```

### Known Gotchas & Critical Patterns

```typescript
// CRITICAL: Environment interface for travel information server
interface Env {
  VALID_API_KEYS: string; // Comma-separated list of valid API keys
  
  // NS API Configuration
  NS_API_KEY: string; // Ocp-Apim-Subscription-Key for NS APIs
  
  // Optional monitoring and caching
  SENTRY_DSN?: string;
  CACHE_ENABLED?: boolean;
}

// CRITICAL: Simple authentication for travel data access
const TRAVEL_ACCESS_LEVELS = {
  FULL: new Set(['admin', 'premium']), // Full access to all travel data
  STANDARD: new Set(['standard']), // Standard travel information access  
  BASIC: new Set(['basic']) // Basic station and route information
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

// CRITICAL: Travel data processing and caching
async function getCachedOrFetch(cacheKey: string, fetchFn: () => Promise<any>, ttl: number = 300) {
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey)!;
    if (Date.now() < cached.expires) {
      return cached.data;
    }
    cache.delete(cacheKey);
  }
  
  const data = await fetchFn();
  cache.set(cacheKey, {
    data,
    expires: Date.now() + (ttl * 1000)
  });
  
  return data;
}

// CRITICAL: Format travel data for AI agents
function formatStationForAgent(station: any) {
  return {
    code: station.code,
    name: station.names?.long || station.name,
    coordinates: station.location ? [station.location.lat, station.location.lng] : null,
    facilities: station.stationFacilities || [],
    accessibility: station.accessibility || 'unknown'
  };
}
```

## Implementation Blueprint

### Data Models & Types

```typescript
// User context for API key-based authentication
type Props = {
  apiKey: string;
  accessLevel: 'full' | 'standard' | 'basic';
};

// Travel data models for AI agents
interface Station {
  code: string;
  uicCode?: string;
  name: string;
  alternativeNames?: string[];
  coordinates?: [number, number]; // [lat, lng]
  stationType: string;
  country: string;
  facilities?: StationFacility[];
  accessibility?: AccessibilityInfo;
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

const StationSearchSchema = z.object({
  query: z.string().min(2, "Search query must be at least 2 characters"),
  limit: z.number().int().min(1).max(100).default(10),
  includeNonPlannableStations: z.boolean().default(false),
  countryCodes: z.array(z.string().length(2)).optional() // ISO country codes
});

const NearestStationsSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  limit: z.number().int().min(1).max(20).default(5),
  radiusKm: z.number().int().min(1).max(50).default(10)
});


```

### List of Tasks (Complete in order)

```yaml
Task 1 - Travel-Focused Project Setup:
  UPDATE existing configuration:
    - MODIFY wrangler.jsonc to add new environment variables
    - UPDATE .dev.vars.example with VALID_API_KEYS, NS_API_KEY, CACHE_ENABLED
    - INSTALL additional dependencies: axios for HTTP requests, date-fns for time handling

  CREATE new environment variables:
    - ADD VALID_API_KEYS for API key authentication
    - ADD NS_API_KEY for NS API authentication
    - ADD CACHE_ENABLED for optional response caching

Task 2 - NS API Client Development:
  CREATE comprehensive NS API client modules:
    - CREATE src/api/ns-stations.ts for Stations API integration
    - CREATE src/api/spoorkaart.ts for route geometry and disruption data
    - CREATE src/api/reisinformatie.ts for journey planning and travel information
    - IMPLEMENT proper error handling and rate limiting for each API
    - ADD intelligent caching strategies for different data types

Task 3 - Travel-Focused MCP Tool Registration:
  CREATE travel tool modules:
    - CREATE src/tools/station-tools.ts for station search and information
    - CREATE src/tools/journey-tools.ts for journey planning and route information
    - CREATE src/tools/service-tools.ts for service status and disruptions
    - CREATE src/tools/travel-tools.ts for comprehensive travel advice

  UPDATE central tool registry:
    - MODIFY src/tools/register-tools.ts to import and register all travel tools
    - IMPLEMENT access-level-based tool registration using API key authentication
    - ADD proper error handling and logging for each tool

Task 4 - Travel Data Processing Logic:
  CREATE travel utility functions:
    - CREATE src/lib/travel-utils.ts for travel calculations and conversions
    - IMPLEMENT coordinate conversion and distance calculations
    - ADD travel time estimation and route optimization functions
    - CREATE data formatting utilities for AI agent consumption

  CREATE caching and performance logic:
    - CREATE src/lib/data-cache.ts for intelligent response caching
    - IMPLEMENT TTL-based cache expiration for different data types
    - ADD cache warming strategies for frequently requested data
    - CREATE cache invalidation logic for real-time data

Task 5 - Enhanced Validation and Error Handling:
  CREATE comprehensive validation:
    - CREATE src/lib/validation.ts with all travel-focused Zod schemas
    - IMPLEMENT input validation for all travel tools
    - ADD response formatting utilities in src/lib/response-helpers.ts
    - CREATE standardized error responses for travel data

  UPDATE security measures:
    - EXTEND access level checking for travel operations using API key system
    - ADD API key validation for all NS API calls
    - IMPLEMENT rate limiting for expensive NS API operations
    - ADD request logging for monitoring travel data usage

Task 6 - Testing Infrastructure:
  CREATE comprehensive tests:
    - ADD unit tests for all NS API integrations
    - CREATE integration tests for travel information workflow
    - ADD mock services for NS APIs (stations, routes, disruptions)
    - IMPLEMENT caching system tests

  UPDATE existing tests:
    - EXTEND existing test fixtures for travel data models
    - ADD access-level-based tests using API keys
    - CREATE end-to-end travel query tests

Task 7 - Enhanced MCP Server Configuration:
  UPDATE main server files:
    - MODIFY src/index.ts to integrate all travel functionality with API key authentication
    - UPDATE src/index_sentry.ts with enhanced travel monitoring
    - ADD new environment variable handling for travel configuration
    - IMPLEMENT access level system based on API keys

  CREATE additional utilities:
    - ADD configuration validation on startup
    - IMPLEMENT health check endpoints for NS API connections
    - CREATE usage analytics for travel queries

Task 8 - Local Development Testing:
  TEST complete functionality:
    - VERIFY all NS API integrations work correctly
    - TEST station search and information retrieval with sample queries
    - VALIDATE journey planning and route information functions
    - VERIFY access level systems work as expected with API keys
    - TEST error handling and recovery scenarios for travel data

Task 9 - Production Deployment:
  PREPARE for production:
    - SET all required Cloudflare Workers secrets (API keys)
    - CONFIGURE caching settings for optimal performance
    - SET up monitoring and alerting for travel services
    - DEPLOY with comprehensive smoke tests for travel functionality
    - VALIDATE all travel information endpoints in production environment
```

### Per Task Implementation Details

```typescript
// Task 3 - Example Tool Implementation Pattern
// src/tools/station-tools.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { Props } from "../types";
import { z } from "zod";
import { callNSAPI } from "../api/ns-stations";
import { getCachedOrFetch, formatStationForAgent } from "../lib/travel-utils";
import { validateApiKey } from "../server/auth";

const FULL_ACCESS_LEVELS = new Set(['full', 'premium']);

export function registerStationTools(server: McpServer, env: Env, props: Props) {
  // Available to all authenticated users
  server.tool(
    "searchStations",
    "Search for Dutch railway stations by name or code",
    StationSearchSchema,
    async ({ query, limit, includeNonPlannableStations, countryCodes }) => {
      try {
        validateApiKey(props.apiKey);
        
        const cacheKey = `stations:search:${query}:${limit}:${includeNonPlannableStations}`;
        
        const stations = await getCachedOrFetch(
          cacheKey,
          () => callNSAPI(
            'https://gateway.apiportal.ns.nl/nsapp-stations/v3',
            { q: query, limit, countryCodes, includeNonPlannableStations },
            env.NS_API_KEY
          ),
          1800 // Cache for 30 minutes
        );
        
        const formattedStations = stations.payload.map(formatStationForAgent);
        
        return {
          content: [{
            type: "text",
            text: `**Stations Found:** ${formattedStations.length}\n\n${formatStationList(formattedStations)}`
          }]
        };
      } catch (error) {
        return createErrorResponse(`Station search failed: ${error.message}`);
      }
    }
  );

  // Enhanced features for full access users
  if (FULL_ACCESS_LEVELS.has(props.accessLevel)) {
    server.tool(
      "getStationDetails",
      "Get detailed information about a specific station including facilities",
      {
        stationCode: z.string().min(2, "Station code must be provided"),
        includeFacilities: z.boolean().default(true)
      },
      async ({ stationCode, includeFacilities }) => {
        try {
          validateApiKey(props.apiKey);

          const cacheKey = `station:details:${stationCode}:${includeFacilities}`;
          
          const stationDetails = await getCachedOrFetch(
            cacheKey,
            () => callNSAPI(
              `https://gateway.apiportal.ns.nl/nsapp-stations/v3/${stationCode}`,
              { includeFacilities },
              env.NS_API_KEY
            ),
            1800 // Cache for 30 minutes
          );
          
          const formatted = formatStationForAgent(stationDetails);
          
          return {
            content: [{
              type: "text", 
              text: `**Station Details**\n\n**Name:** ${formatted.name}\n**Code:** ${formatted.code}\n**Coordinates:** ${formatted.coordinates?.join(', ') || 'N/A'}\n**Type:** ${formatted.stationType}\n**Facilities:** ${formatted.facilities?.length || 0} available`
            }]
          };
        } catch (error) {
          return createErrorResponse(`Station details retrieval failed: ${error.message}`);
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
  - wrangler.jsonc: Add VALID_API_KEYS, NS_API_KEY, CACHE_ENABLED to environment
  - Edge caching: Global distribution of travel data responses
  - Secrets: All API keys stored as Cloudflare Workers secrets

API_KEY_AUTHENTICATION:
  - Simple access levels: full, standard, basic for travel data access
  - User context: API key mapped to access levels for travel features
  - Request validation: API key validation on every travel request

CACHING_STRATEGY:
  - In-memory cache: Fast access to frequently requested travel data
  - TTL-based expiration: Different cache times for different data types
  - Cache warming: Proactive loading of popular station and route data
  - Cache invalidation: Real-time updates for disruptions and delays

EXTERNAL_APIS:
  - NS Stations API: Station search, details, and location services
  - SpoorKaart API: Route geometry and service disruption information  
  - ReisinformatieAPI: Journey planning and comprehensive travel information

ENVIRONMENT_VARIABLES:
  - Development: .dev.vars with all API keys and configuration
  - Production: Cloudflare Workers secrets
  - Required: VALID_API_KEYS, NS_API_KEY
  - Optional: SENTRY_DSN for monitoring, CACHE_ENABLED for performance

RATE_LIMITING:
  - NS API: Respect rate limits and implement intelligent backoff strategies
  - Cache Usage: Minimize API calls through intelligent caching
  - MCP Tools: Per-API-key rate limiting for travel query operations
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

### Level 2: NS API Connection & Validation

```bash
# Test NS API connectivity and authentication
curl -H "Ocp-Apim-Subscription-Key: $NS_API_KEY" \
  "https://gateway.apiportal.ns.nl/nsapp-stations/v3?q=amsterdam&limit=5"

# Test SpoorKaart API for route data
curl -H "Ocp-Apim-Subscription-Key: $NS_API_KEY" \
  "https://gateway.apiportal.ns.nl/spoorkaart-api/api/v1/disruptions"

# Expected: Valid JSON responses with travel data
# If errors: Check NS_API_KEY, API subscription status, network connectivity
```

### Level 3: Travel Data Processing & Caching

```bash
# Test travel data formatting and caching
npm run test:travel-utils         # Travel utility function tests
npm run test:caching             # Cache implementation tests

# Test coordinate conversion and distance calculations
npm run test:coordinates         # Geographic calculation tests

# Expected: All travel processing functions work correctly
# If errors: Fix formatting functions, cache logic, coordinate calculations
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
- [ ] NS API connections: All NS APIs respond correctly with valid data
- [ ] Local server starts: `wrangler dev` runs without errors
- [ ] MCP endpoint responds: `curl -H "x-api-key: validkey" http://localhost:8787/mcp` returns server info
- [ ] API key authentication: Valid keys accepted, invalid keys rejected for travel requests

### Station Information System

- [ ] Station search by name and code returns accurate results
- [ ] Station details include facilities, coordinates, and accessibility info
- [ ] Nearest station lookup works correctly with geographic coordinates
- [ ] Station information formatted properly for AI agent consumption
- [ ] Multi-language station names handled correctly





### Security & Performance

- [ ] Access levels prevent unauthorized access to premium travel features
- [ ] API key validation working for all NS API service calls
- [ ] Rate limiting prevents abuse of travel information requests
- [ ] Caching system reduces API calls and improves response times
- [ ] Error messages don't leak sensitive NS API credentials or internal details

### Production Readiness

- [ ] All required secrets configured in Cloudflare Workers (API keys)
- [ ] Monitoring and logging active for travel service health (Sentry integration if used)
- [ ] Caching strategy optimized for production travel data loads
- [ ] Health checks for NS API connections functional
- [ ] Comprehensive test coverage for travel information workflows achieved

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

This comprehensive PRP provides all the context, patterns, and implementation details needed to build a production-ready MCP server that provides AI agents with seamless access to Dutch Railways (NS) API data for travel planning and station information, using API key authentication for secure and scalable access.