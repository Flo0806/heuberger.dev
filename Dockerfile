# Stage 1: Build
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the SSR app
RUN pnpm build

# Stage 2: Production runtime
FROM node:22-bookworm-slim

WORKDIR /app

# Copy built output from builder
COPY --from=builder /app/.output ./.output

# Create data directory for counter storage
RUN mkdir -p ./.data/counter

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Run the Nitro server
CMD ["node", ".output/server/index.mjs"]
