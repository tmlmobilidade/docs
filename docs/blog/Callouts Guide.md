---
title: Callouts Guide
description: Learn how to use Obsidian-style callouts in your documentation
tags:
  - "#callouts"
  - "#markdown"
---

# Callouts Guide

Callouts are a powerful way to highlight important information in your documentation. They use Obsidian's blockquote syntax with special markers.

## Basic Syntax

All callouts use the `> [!type]` syntax at the start of a blockquote:

```markdown
> [!note] Title
> Content goes here
```

## Available Callout Types

### Note

> [!note] General Information
> Use note callouts for general information that readers should be aware of. This is the default callout type.

### Tip

> [!tip] Helpful Hint
> Tip callouts are perfect for sharing best practices, shortcuts, or helpful hints that can improve the user experience.

### Warning

> [!warning] Important Warning
> Warning callouts alert users about potential issues, important considerations, or things they should be cautious about.

### Danger

> [!danger] Critical Warning
> Danger callouts should be reserved for critical warnings that could cause data loss, system failures, or other serious consequences.

### Info

> [!info] Additional Context
> Info callouts provide supplementary information or additional context that might be helpful but isn't critical.

### Success

> [!success] Operation Complete
> Success callouts indicate successful operations, positive outcomes, or completed tasks.

### Quote

> [!quote] Inspirational Quote
> Quote callouts are perfect for highlighting memorable quotes, testimonials, or important statements.

## Collapsible Callouts

You can make callouts collapsible by adding a `+` after the type:

> [!note]+ Collapsible Note
> This callout can be collapsed and expanded. Click the header to toggle visibility.
> 
> This is useful for:
> - Hiding detailed information by default
> - Reducing visual clutter
> - Providing optional context

> [!tip]+ Advanced Tip
> This tip is hidden by default. Click to expand and see advanced techniques.
> 
> Advanced techniques include:
> 1. Using custom transformers
> 2. Implementing rate limiting
> 3. Caching strategies

## Examples in Context

### API Documentation Example

> [!note] Authentication Required
> All endpoints in this section require a valid API key. Include it in the `Authorization` header as `Bearer YOUR_API_KEY`.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.tmlmobilidade.pt/v1/routes
```

> [!warning] Rate Limits
> This endpoint is rate-limited to 1000 requests per hour per API key. Exceeding this limit will result in a `429 Too Many Requests` response.

### Code Example

> [!tip] Best Practice
> Always handle errors gracefully and implement retry logic with exponential backoff.

```typescript
async function fetchWithRetry(url: string, maxRetries = 3): Promise<Response> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  throw new Error('Max retries exceeded');
}
```

> [!danger] Production Warning
> Never expose your API keys in client-side code. Always use environment variables or secure server-side storage.

## Best Practices

> [!tip] Callout Guidelines
> 
> - **Be concise**: Keep callout content brief and focused
> - **Use appropriate types**: Match the callout type to the importance and nature of the information
> - **Don't overuse**: Too many callouts can reduce their impact
> - **Provide context**: Always include a clear title that explains what the callout is about

## Combining with Other Elements

You can include other markdown elements inside callouts:

> [!note] Formatting Examples
> 
> **Bold text** and *italic text* work inside callouts.
> 
> - Lists work too
> - Including nested items
>   - Like this
> 
> `Inline code` and [links](https://example.com) are also supported.
> 
> Even code blocks:
> 
> ```javascript
> console.log('Hello from a callout!');
> ```

---

Use callouts strategically to make your documentation more scannable and help readers quickly identify important information.
