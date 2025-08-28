FROM oven/bun:latest AS build

WORKDIR /app

# Copy all necessary files relative to root context:
COPY frontend/package.json frontend/bun.lock frontend/tsconfig.json frontend/index.html frontend/vite.config.ts ./
COPY frontend/src ./src
COPY shared ./shared

RUN ls -la /app

RUN bun install
RUN bun run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /docker-entrypoint.d

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
