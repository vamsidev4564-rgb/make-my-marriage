# Make My Marriage

Make My Marriage is a wedding coordination platform. Product and technical documents are kept in [`docs/`](docs/).

## Phase 1 scaffold

The repository contains separate Next.js and FastAPI applications. Each application has its own dependencies and local environment file. The current homepage is a placeholder, and the API currently exposes a health check at `/api/v1/health`.

## Prerequisites

- Node.js 20.9 or newer and npm
- Python 3.11 or newer

## Run the frontend

In PowerShell, from the repository root:

```powershell
Set-Location apps/web
npm.cmd install
npm.cmd run dev
```

Open <http://localhost:3000>. The frontend environment example is `apps/web/.env.example`; the placeholder page does not need environment values yet.

## Run the backend

In a second PowerShell window, from the repository root:

```powershell
Set-Location apps/api
python -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements.txt
if (-not (Test-Path -LiteralPath '.env')) { Copy-Item -LiteralPath '.env.example' -Destination '.env' }
.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

The health check is available at <http://localhost:8000/api/v1/health>, and FastAPI's interactive API page is at <http://localhost:8000/docs>.

The backend reads local settings from `apps/api/.env`. Keep real environment files and secrets out of Git. MongoDB, authentication, storage, notifications, and product features are planned for later phases.

## Project layout

```text
apps/web/   Next.js App Router frontend
apps/api/   FastAPI application
docs/       Product and technical documents
```
