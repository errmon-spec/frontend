# errmon-spa

## Desenvolvimento local

Este projeto oferece suporte à contêineres de desenvolvimento (dev container).

### Docker compose

```bash
docker compose -f .devcontainer/docker-compose.yml run --rm runner
```

### VS Code

```bash
devcontainer open .
```

## Fly.io

```bash
fly deploy \
--build-secret KEYCLOAK_CLIENT_ID="$VITE_KEYCLOAK_CLIENT_ID" \
--build-secret KEYCLOAK_REALM="$VITE_KEYCLOAK_REALM" \
--build-secret KEYCLOAK_URL="$VITE_KEYCLOAK_URL"
```
