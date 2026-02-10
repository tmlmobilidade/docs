---
title: Component Showcase
description: Demonstration of all Obsidian-style markdown components
tags:
  - "#components"
  - "#showcase"
  - "#styling"
---

# Component Showcase

This page demonstrates all the Obsidian-inspired markdown components available in the documentation system.

## Callouts

Callouts are special blockquotes that provide visual emphasis for important information. They use Obsidian's `> [!type]` syntax.

### Note Callout

> [!note] Important Information
> This is a note callout. Use it for general information that readers should be aware of.

### Tip Callout

> [!tip] Pro Tip
> This is a tip callout. Perfect for helpful hints and best practices.

### Warning Callout

> [!warning] Warning
> This is a warning callout. Use it to alert users about potential issues or important considerations.

### Danger Callout

> [!danger] Critical Warning
> This is a danger callout. Reserve this for critical warnings that could cause data loss or system failures.

### Info Callout

> [!info] Additional Context
> This is an info callout. Use it to provide additional context or supplementary information.

### Quote Callout

> [!quote] Inspirational Quote
> "The best way to predict the future is to create it." — Peter Drucker

### Success Callout

> [!success] Operation Complete
> This is a success callout. Use it to indicate successful operations or positive outcomes.

---

## Code Blocks

Code blocks are enhanced with language labels and copy-to-clipboard functionality.

### JavaScript Example

```javascript
// Example API call
async function fetchVehiclePositions(routeId) {
  const response = await fetch(
    `https://api.tmlmobilidade.pt/v1/routes/${routeId}/vehicles`
  );
  const data = await response.json();
  return data.vehicles;
}
```

### TypeScript Example

```typescript
interface VehiclePosition {
  id: string;
  routeId: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

function getVehicleById(vehicles: VehiclePosition[], id: string): VehiclePosition | undefined {
  return vehicles.find(v => v.id === id);
}
```

### Python Example

```python
import requests
from typing import List, Dict

def get_stop_arrivals(stop_id: str) -> List[Dict]:
    """Fetch real-time arrivals for a specific stop."""
    url = f"https://api.tmlmobilidade.pt/v1/stops/{stop_id}/arrivals"
    response = requests.get(url)
    return response.json().get("arrivals", [])
```

### JSON Example

```json
{
  "route": {
    "id": "101",
    "name": "Aeroporto - Cais do Sodré",
    "operator": "Carris Metropolitana"
  },
  "vehicles": [
    {
      "id": "VH-1234",
      "latitude": 38.7223,
      "longitude": -9.1393
    }
  ]
}
```

---

## Blockquotes

Blockquotes provide a way to highlight quoted text or important excerpts.

> The GTFS (General Transit Feed Specification) is a common format for public transportation schedules and associated geographic information. It allows public transit agencies to publish their transit data and developers to write applications that consume that data in an interoperable way.

> Real-time transit data helps passengers make informed decisions about their journeys, reducing wait times and improving the overall transit experience.

---

## Tables

Tables are styled with clean horizontal lines and alternating row backgrounds.

### API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/v1/routes` | List all routes | Optional |
| GET | `/v1/routes/{id}` | Get route details | Optional |
| GET | `/v1/routes/{id}/vehicles` | Get vehicles on route | Required |
| GET | `/v1/stops/{id}/arrivals` | Get stop arrivals | Required |
| POST | `/v1/webhooks` | Create webhook | Required |

### Vehicle Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `IN_TRANSIT` | Active | Vehicle is currently in service |
| `AT_STOP` | Stopped | Vehicle is stopped at a station |
| `OUT_OF_SERVICE` | Inactive | Vehicle is not in service |
| `MAINTENANCE` | Maintenance | Vehicle is undergoing maintenance |

### Data Types

| Type | Format | Example | Notes |
|------|--------|---------|-------|
| `timestamp` | ISO 8601 | `2024-01-15T14:30:00Z` | UTC timezone |
| `latitude` | Decimal | `38.7223` | WGS84 coordinate |
| `longitude` | Decimal | `-9.1393` | WGS84 coordinate |
| `route_id` | String | `"101"` | Alphanumeric identifier |

---

## Tags

Tags are displayed as pill-shaped badges with a hash prefix. They can be used in frontmatter:

**Tags used in this page:**
- `#components`
- `#showcase`
- `#styling`

---

## Cards

Cards are used to create visually appealing link cards with icons and descriptions.

<Cards>
  <Card icon="📚" title="API Documentation" href="/docs/api">
    Complete reference for all API endpoints, request/response formats, and authentication methods.
  </Card>
  <Card icon="🚌" title="GTFS Guide" href="/docs/gtfs">
    Learn about our GTFS implementation, including scheduled and real-time data formats.
  </Card>
  <Card icon="📊" title="Datasets" href="https://github.com/carrismetropolitana/datasets">
    Access open datasets including route networks, stop locations, and historical transit data.
  </Card>
  <Card icon="🔧" title="Developer Tools" href="/docs/tools">
    Tools and utilities to help developers integrate with our transit data.
  </Card>
</Cards>

---

## Mixed Content Example

Here's an example combining multiple components:

> [!note] API Rate Limits
> Our API has rate limits to ensure fair usage. Free tier accounts can make up to 1000 requests per hour.

### Implementation Example

```typescript
// Rate-limited API client
class TMLAPIClient {
  private rateLimiter: Map<string, number[]> = new Map();
  
  async request(endpoint: string): Promise<Response> {
    this.checkRateLimit(endpoint);
    return fetch(`https://api.tmlmobilidade.pt${endpoint}`);
  }
  
  private checkRateLimit(endpoint: string): void {
    const now = Date.now();
    const requests = this.rateLimiter.get(endpoint) || [];
    const recentRequests = requests.filter(t => now - t < 3600000);
    
    if (recentRequests.length >= 1000) {
      throw new Error('Rate limit exceeded');
    }
    
    recentRequests.push(now);
    this.rateLimiter.set(endpoint, recentRequests);
  }
}
```

### Rate Limit Status Codes

| Status Code | Meaning | Action |
|------------|---------|--------|
| `200` | Success | Continue |
| `429` | Too Many Requests | Wait before retrying |
| `503` | Service Unavailable | Retry with exponential backoff |

> [!tip] Best Practice
> Implement exponential backoff when handling rate limit errors to avoid overwhelming the API.

---

## Headings Hierarchy

The documentation system supports a clear heading hierarchy:

### Level 3 Heading

#### Level 4 Heading

##### Level 5 Heading

---

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered Lists

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

---

## Horizontal Rules

Use horizontal rules to separate major sections:

---

## Inline Code

Use `inline code` for short code snippets, variable names, or technical terms like `routeId`, `stopId`, or `vehiclePosition`.

---

## Links

[Link to API Documentation](/docs/api) | [External Link](https://github.com/carrismetropolitana) | [Blog Post](/blog/hello)

---

This showcase demonstrates all the Obsidian-inspired components available in the documentation system. Each component is designed to provide a clean, modern, and consistent visual experience.
