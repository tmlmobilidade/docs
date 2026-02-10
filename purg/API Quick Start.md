---
title: API Quick Start
description: Get started with the TML Mobilidade API in minutes
tags:
  - "#api"
  - "#quickstart"
  - "#guide"
---

# API Quick Start

This guide will help you get started with the TML Mobilidade API in just a few minutes.

## Prerequisites

Before you begin, make sure you have:

- A valid API key (get one at [api.tmlmobilidade.pt](https://api.tmlmobilidade.pt))
- Basic knowledge of REST APIs
- Your favorite HTTP client (curl, Postman, or your preferred tool)

> [!note] Free Tier Available
> We offer a free tier with 1000 requests per hour. Perfect for testing and development!

## Authentication

All API requests require authentication using a Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.tmlmobilidade.pt/v1/routes
```

> [!warning] Keep Your API Key Secret
> Never expose your API key in client-side code or public repositories. Always use environment variables or secure storage.

## Your First Request

Let's start by fetching a list of all available routes:

```javascript
const response = await fetch('https://api.tmlmobilidade.pt/v1/routes', {
  headers: {
    'Authorization': `Bearer ${process.env.API_KEY}`
  }
});

const routes = await response.json();
console.log(routes);
```

### Response Format

The API returns data in JSON format:

```json
{
  "routes": [
    {
      "id": "101",
      "name": "Aeroporto - Cais do Sodré",
      "operator": "Carris Metropolitana",
      "type": "bus"
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "per_page": 20
  }
}
```

## Common Endpoints

Here are the most commonly used endpoints:

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/v1/routes` | GET | List all routes | No |
| `/v1/routes/{id}` | GET | Get route details | No |
| `/v1/routes/{id}/vehicles` | GET | Get vehicles on route | Yes |
| `/v1/stops/{id}` | GET | Get stop information | No |
| `/v1/stops/{id}/arrivals` | GET | Get real-time arrivals | Yes |
| `/v1/vehicles/{id}` | GET | Get vehicle position | Yes |

> [!tip] Rate Limits
> Free tier: 1000 requests/hour
> Pro tier: 10,000 requests/hour
> Enterprise: Custom limits available

## Error Handling

The API uses standard HTTP status codes:

| Status Code | Meaning | What to Do |
|------------|---------|------------|
| `200` | Success | Continue normally |
| `400` | Bad Request | Check your request parameters |
| `401` | Unauthorized | Verify your API key |
| `404` | Not Found | Check the resource ID |
| `429` | Too Many Requests | Wait before retrying |
| `500` | Server Error | Try again later |

> [!danger] Rate Limit Exceeded
> If you receive a `429` status code, wait at least one hour before making more requests. Implementing exponential backoff is recommended.

## Example: Get Real-Time Arrivals

Here's a complete example that fetches real-time arrivals for a specific stop:

```typescript
interface Arrival {
  routeId: string;
  routeName: string;
  destination: string;
  estimatedArrival: Date;
  vehicleId: string;
}

async function getStopArrivals(stopId: string): Promise<Arrival[]> {
  const response = await fetch(
    `https://api.tmlmobilidade.pt/v1/stops/${stopId}/arrivals`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.arrivals.map((arrival: any) => ({
    ...arrival,
    estimatedArrival: new Date(arrival.estimatedArrival)
  }));
}

// Usage
const arrivals = await getStopArrivals('STOP-123');
console.log(`Next bus arrives in ${arrivals[0].estimatedArrival} minutes`);
```

> [!info] Timezone Information
> All timestamps are returned in UTC. Convert to local time as needed for your application.

## Best Practices

> [!tip] Performance Tips
> 
> - **Cache responses**: Route and stop data changes infrequently
> - **Use pagination**: For large datasets, use the `page` and `per_page` parameters
> - **Implement retry logic**: Handle transient errors gracefully
> - **Monitor rate limits**: Track your API usage to avoid hitting limits

### Caching Example

```javascript
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

class APIClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.cache = new Map();
  }

  async getRoutes() {
    const cacheKey = 'routes';
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    const response = await fetch('https://api.tmlmobilidade.pt/v1/routes', {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
    
    const data = await response.json();
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  }
}
```

## Next Steps

Now that you've made your first API call, here's what to explore next:

<Cards>
  <Card icon="📚" title="Full API Reference" href="/docs/api">
    Complete documentation for all endpoints, request/response formats, and advanced features.
  </Card>
  <Card icon="🔐" title="Authentication Guide" href="/docs/authentication">
    Learn about API keys, OAuth, and security best practices.
  </Card>
  <Card icon="📊" title="Data Models" href="/docs/data-models">
    Understand the structure of routes, stops, vehicles, and other data entities.
  </Card>
  <Card icon="💡" title="Examples & Tutorials" href="/docs/examples">
    Real-world examples and step-by-step tutorials for common use cases.
  </Card>
</Cards>

## Getting Help

> [!info] Support Resources
> 
> - **Documentation**: Check our [full documentation](/docs) for detailed guides
> - **GitHub**: Report issues or ask questions on [GitHub](https://github.com/tmlmobilidade)
> - **Email**: Contact us at api-support@tmlmobilidade.pt

---

Happy coding! 🚀
