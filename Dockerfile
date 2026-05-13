# Multi-stage build for Next.js application
# Stage 1: Dependencies
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN apk add --no-cache libc6-compat && npm install --legacy-peer-deps

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY .env* ./
COPY . .

# Build the Next.js application
RUN SKIP_ENV_VALIDATION=true SKIP_TYPE_CHECK=true npm run build

# Stage 3: Runtime
FROM node:20-alpine AS runtime
WORKDIR /app

# Install dumb-init to handle signals properly
RUN apk add --no-cache dumb-init libc6-compat

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY .env* ./

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Expose port 4043
EXPOSE 4043

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4043
ENV HOSTNAME="0.0.0.0"

# Use dumb-init to handle signals
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["npm", "start"]
