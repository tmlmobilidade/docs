# # #

FROM node:24-alpine AS base

# # #
# ENVIRONMENT ARGUMENTS

ARG ENVIRONMENT

ENV ENVIRONMENT=${ENVIRONMENT}
ENV NEXT_PUBLIC_ENVIRONMENT=${ENVIRONMENT}


# # #
# BUILDER STAGE

FROM base AS builder

ARG MODULE
ARG APP

WORKDIR /app

# First install the dependencies (as they change less often)
COPY package.json package-lock.json ./
RUN npm ci

# Build the app
COPY . .
RUN npm run build


# # #
# RUNNER STAGE

FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

CMD node server.js
