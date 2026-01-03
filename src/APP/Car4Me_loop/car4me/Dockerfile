# LoopBack 4 (TypeScript) — build + runtime com deps de produção

FROM node:24-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Garante que existe sempre (para o COPY não falhar)
RUN mkdir -p public


FROM node:24-slim AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev


FROM node:24-slim AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/public ./public

USER node

EXPOSE 3000
CMD ["node", "dist/index.js"]
