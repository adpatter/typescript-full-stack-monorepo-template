# TypeScript Full-stack Monorepo Template

A minimal full-stack TypeScript template. The API serves static assets over HTTPS and the web app provides the front-end UI.

## Requirements

- Node.js `>=24.0.0`
- npm `>=11.0.0`

## Setup

1. Install dependencies at the repo root:

```bash
npm install
```

2. Build the apps:

```bash
npm run build
```

3. Create your environment file:

```bash
cp .env.example .env
```

4. Update `.env` values (see [Environment Variables](#environment-variables) below).

5. Run the server.

```bash
npm run start
```

## Environment Variables

The API reads these values from `.env`:

- `KEY_PATH`: Path to your TLS private key.
- `CERT_PATH`: Path to your TLS certificate.
- `WEB_ROOT`: Absolute path to the web build output (e.g. `./apps/web/dist`).
- `HOST_NAME`: Bind address (e.g. `0.0.0.0`).
- `PORT`: HTTPS port (e.g. `8443`).

## Common Commands

From the repo root:

### Build

- Build all:

```bash
npm run build
```

### Lint

- Lint all:

```bash
npm run lint
```

### Format

- Format all:

```bash
npm run format
```

### Run the server

- Start server:

```bash
npm run start
```

### Watch for changes

- Watch mode:

```bash
npm run monitor
```

## Project Structure

- `apps/api`: HTTPS static file server.
- `apps/web`: Front-end assets (bundled by webpack).

## Template Goals

- Minimal, explicit tooling.
- TypeScript in both API and web.
- Linting that enforces declared dependencies.
- HTTPS local serving out of the box.

## Notes

- Web assets are built into `apps/web/dist` and served by the API.
- `.env` is ignored by git (see .gitignore); use `.env.example` as a template.
