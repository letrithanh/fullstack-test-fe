# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
# Use npm ci for cleaner installs in CI/CD environments
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
# This enables Output File Tracing by default
# https://nextjs.org/docs/advanced-features/output-file-tracing
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment variable for production
ENV NODE_ENV=production
# Optionally, uncomment the following line if you need to bind to a specific hostname
# ENV HOSTNAME 0.0.0.0

# Copy necessary files from the builder stage based on Output File Tracing
COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

# Expose the port the app runs on (default Next.js port)
EXPOSE 3000

# Set the user to run the application (optional but recommended for security)
USER node

# Command to run the application
# Use node server.js directly as required by the standalone output from `next build`
CMD ["node", "server.js"]
