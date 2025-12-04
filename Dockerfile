# ---------------------------
# 1) Build Stage
# ---------------------------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# ---------------------------
# 2) Run Stage (Production)
# ---------------------------
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production
EXPOSE 3000

# Runs your app when container starts.
CMD ["npm", "start"] 