---
title: Introducing Obsidian-Style Components
description: We've redesigned our documentation with beautiful Obsidian-inspired components for a better reading experience.
author: TML Team
date: 2024-01-15
tags:
  - "#announcement"
  - "#design"
  - "#components"
---

# Introducing Obsidian-Style Components

We're excited to announce a major update to our documentation system! We've redesigned the entire documentation experience with beautiful, Obsidian-inspired components that make reading and navigating our docs more enjoyable.

## What's New

Our documentation now features:

- **Beautiful callouts** for highlighting important information
- **Enhanced code blocks** with syntax highlighting and copy buttons
- **Styled tables** with clean, readable formatting
- **Tag system** for better content organization
- **Card components** for visual navigation

## Callouts

One of the most noticeable improvements is our new callout system. You can now use Obsidian-style callouts to highlight different types of information:

> [!note] Important Update
> This documentation update includes new components that make it easier to find and understand information.

> [!tip] Pro Tip
> Use callouts to draw attention to important information, tips, or warnings in your documentation.

> [!warning] Breaking Changes
> Some API endpoints have been updated. Please review the migration guide for details.

## Enhanced Code Blocks

Code examples now feature:

- Language labels in the header
- One-click copy-to-clipboard functionality
- Better syntax highlighting with Catppuccin themes
- Improved readability

```typescript
// Example: Fetching vehicle positions
interface VehiclePosition {
  id: string;
  routeId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

async function getVehiclePositions(routeId: string): Promise<VehiclePosition[]> {
  const response = await fetch(
    `https://api.tmlmobilidade.pt/v1/routes/${routeId}/vehicles`
  );
  return response.json();
}
```

## Styled Tables

Tables are now more readable with:

- Clean horizontal lines
- Alternating row backgrounds
- Hover effects
- Responsive design

| Feature | Status | Notes |
|---------|--------|-------|
| Callouts | ✅ Available | All callout types supported |
| Code Blocks | ✅ Available | With copy functionality |
| Tables | ✅ Available | Responsive design |
| Tags | ✅ Available | Pill-shaped badges |
| Cards | ✅ Available | For navigation |

## Tag System

Tags are now displayed as beautiful pill-shaped badges:

- `#announcement` - For new features and updates
- `#design` - For design-related posts
- `#components` - For component documentation
- `#api` - For API-related content

## What This Means for You

> [!info] Better Documentation Experience
> These improvements make our documentation easier to read, navigate, and understand. Whether you're a developer integrating with our API or a researcher analyzing our transit data, you'll find the new components make information easier to find and digest.

## Try It Out

Visit our [Component Showcase](/docs/Component%20Showcase) page to see all the new components in action, or check out our [Callouts Guide](/docs/Callouts%20Guide) to learn how to use callouts in your own documentation.

## Feedback

We'd love to hear your thoughts on these improvements! If you have suggestions or feedback, please reach out through our [GitHub repository](https://github.com/tmlmobilidade).

---

*Happy documenting!* 🚀
