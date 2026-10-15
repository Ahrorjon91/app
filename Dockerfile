FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy source files
COPY . .

# Build Vite frontend assets into dist/
RUN npm run build

# Production runtime stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy node_modules and built assets from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/server.cjs ./server.cjs
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Create directories for persistent SQLite data and uploaded files
RUN mkdir -p /app/data /app/uploads

# Expose container port
EXPOSE 3000

# Mount persistent data volumes
VOLUME ["/app/data", "/app/uploads"]

# Start full-stack Node.js server
CMD ["npm", "start"]
