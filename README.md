# OrbitHire

<p align="center">
  <strong>A modern hiring platform that brings candidates and employers into one orbit.</strong>
</p>

<p align="center">
  Built with Laravel, PostgreSQL, Laravel Sanctum, and Next.js.
</p>

<p align="center">
  <a href="#getting-started">Get started</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#roadmap">Roadmap</a>
</p>

---

## ✨ Overview

OrbitHire is a full-stack job portal designed for two sides of the hiring journey: candidates discovering their next opportunity, and employers publishing roles and managing applications. Its API-first foundation keeps the platform flexible, testable, and ready for a dedicated Next.js experience.

## 🎬 Product demo

> Replace this link with your uploaded YouTube, Loom, or GitHub asset URL.

[▶ Watch the OrbitHire walkthrough](DEMO_URL)

For the best README experience, use a short H.264 `.mp4` demo or host the full recording on YouTube/Loom. Add focused screenshots below to make the important screens immediately scannable.

| Candidate experience | Employer experience |
| --- | --- |
| `docs/images/candidate-dashboard.png` | `docs/images/employer-dashboard.png` |

<!-- Replace the two paths above with actual screenshots, then use:
![Candidate dashboard](docs/images/candidate-dashboard.png)
-->

## 🚀 What OrbitHire enables

- **Role-aware access** — focused candidate and employer journeys backed by secure authentication.
- **Job discovery** — browse, search, and filter open positions.
- **Application tracking** — submit applications and follow their status through the hiring process.
- **Employer workflow** — create job posts and manage incoming candidates.
- **Profile management** — maintain candidate and employer profiles in one consistent system.

## 🧰 Tech stack

| Layer | Technology |
| --- | --- |
| API | Laravel 11 · PHP 8.2 |
| Database | PostgreSQL |
| Authentication | Laravel Sanctum |
| Web app | Next.js *(in progress)* |
| Design approach | Repository + Service layers |

## 🏗️ Architecture

OrbitHire separates business rules from data access so that controllers remain thin and the API can evolve without tightly coupling application logic to the database.

```text
HTTP request
    ↓
Controller
    ↓
Service layer       ← business rules and workflows
    ↓
Repository layer    ← data-access boundary
    ↓
PostgreSQL
```

```text
orbithire/
├── backend/        # Laravel REST API
└── frontend/       # Next.js web application
```

## ⚙️ Getting started

### Prerequisites

- PHP 8.2+
- Composer
- PostgreSQL
- Node.js 20+ *(for the frontend, when available)*

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Set the PostgreSQL connection in `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=orbithire_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Then migrate the database and run the API:

```bash
php artisan migrate
php artisan serve
```

The API will be available at `http://127.0.0.1:8000` by default.

### Frontend

The Next.js client is currently under development. Its setup instructions will be added here once the first user-facing flows are ready.

## 🗺️ Roadmap

- [x] Laravel backend scaffolding
- [x] PostgreSQL integration
- [x] Sanctum authentication setup
- [ ] Job and application database schema
- [ ] Jobs, applications, and profile API endpoints
- [ ] Next.js frontend
- [ ] Deployment and production configuration

## 🤝 Contributing

Contributions, ideas, and bug reports are welcome. Please open an issue to discuss substantial changes before submitting a pull request.

## 👤 Author

Built by [Avik Mukherjee](https://github.com/Avik2024).
# OrbitHire

OrbitHire is a full-stack job portal connecting candidates and employers. Built with a Laravel REST API backend, PostgreSQL database, and Next.js frontend, it features role-based dashboards, job posting and search, application tracking, and Sanctum-based authentication — architected with clean Repository and Service layer patterns.

## Tech Stack

- **Backend:** Laravel 11, PHP 8.2
- **Database:** PostgreSQL
- **Authentication:** Laravel Sanctum
- **Frontend:** Next.js (in progress)
- **Architecture:** Repository + Service layer pattern

## Features

- Role-based authentication (Candidate / Employer)
- Job posting, browsing, search, and filtering
- Application submission and status tracking
- Candidate and employer profile management
- Clean, decoupled API-first architecture

## Project Structure

```
orbithire/
├── backend/     # Laravel REST API
└── frontend/    # Next.js frontend (coming soon)
```

## Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Configure your `.env` with PostgreSQL credentials:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=orbithire_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Run migrations:
```bash
php artisan migrate
```

Start the dev server:
```bash
php artisan serve
```

## Frontend Setup

*(Coming soon)*

## Roadmap

- [x] Laravel backend scaffolding
- [x] PostgreSQL integration
- [x] Sanctum authentication setup
- [ ] Job posting & application database schema
- [ ] Core API endpoints (Jobs, Applications, Profiles)
- [ ] Next.js frontend
- [ ] Deployment

## Author

**Avik Mukherjee** ([@Avik2024](https://github.com/Avik2024))
