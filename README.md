# Waste2Worth ♻️

**Turn Waste Into Worth.**

Waste2Worth is a startup-style full-stack sustainability MVP that helps users submit recyclable waste, estimate its value, create collection requests, and track recycling activity.

## Live Demo

Add your Vercel URL here after deployment.

## Core Features

- User registration and login
- Secure password hashing
- Waste category and value engine
- Waste submission workflow
- Automatic estimated-value calculation
- Collection request tracking
- Request event history
- Admin operations dashboard
- Request status management
- User-specific request access
- SQLite + Prisma database
- Server-side validation
- Responsive startup-style UI
- Automated calculation tests

## Product Flow

```text
Register
  ↓
Dashboard
  ↓
Submit Waste
  ↓
Estimate Value
  ↓
Create Request
  ↓
Admin Collection Workflow
  ↓
Collected
  ↓
Completed
```

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- SQLite
- bcryptjs
- Zod
- Vitest
- Vercel

## Architecture

```text
Next.js App Router
       │
       ├── Server Components
       ├── Client Components
       └── API Routes
               │
             Prisma
               │
             SQLite
```

## Local Setup

```bash
npm install
cp .env.example .env
npx prisma db push
npm run db:seed
npm run dev
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Open `http://localhost:3000`.

### Demo admin

```text
Email: admin@waste2worth.local
Password: Admin@12345
```

Change this demo credential before any public production use.

## Testing

```bash
npm test
```

## Production Build

```bash
npm run build
npm start
```

## Environment Variables

See `.env.example`.

Never commit `.env` or `.env.local`.

## Roadmap

### V1
- Authentication
- Waste value estimation
- Collection workflow
- Request tracking
- Admin operations

### V2
- Collector accounts
- Pickup scheduling
- Notifications
- Map-based collection

### V3
- Rewards
- Business accounts
- Recycling partners
- Impact certificates

### V4
- Image-based waste classification
- Smart pricing
- Route optimization
- Demand forecasting

## Project Positioning

Waste2Worth demonstrates full-stack application development, database modeling, API design, authentication, validation, business logic, role-based workflows, testing and deployment.

## Author

**Haritha Kongi**

GitHub: https://github.com/HarithaKongi
