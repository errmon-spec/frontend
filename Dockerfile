# syntax = docker/dockerfile:1

FROM node:20-bookworm-slim AS build

WORKDIR /app

ENV NODE_ENV="production"

# hadolint ignore=DL3008
RUN apt-get update -qq \
    && apt-get install --no-install-recommends -y \
        build-essential \
        node-gyp \
        pkg-config \
        python-is-python3 \
    && rm -rf /var/lib/apt/lists/*

COPY --link package-lock.json package.json ./

RUN npm ci --include=dev

COPY --link . .

RUN --mount=type=secret,id=KEYCLOAK_CLIENT_ID \
    --mount=type=secret,id=KEYCLOAK_REALM \
    --mount=type=secret,id=KEYCLOAK_URL \
    VITE_KEYCLOAK_CLIENT_ID="$(cat /run/secrets/KEYCLOAK_CLIENT_ID)" \
    VITE_KEYCLOAK_REALM="$(cat /run/secrets/KEYCLOAK_REALM)" \
    VITE_KEYCLOAK_URL="$(cat /run/secrets/KEYCLOAK_URL)" \
    npm run build

##
## Final image
##

FROM nginx:1.25-bookworm

COPY --from=build /app/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["/usr/sbin/nginx"]
