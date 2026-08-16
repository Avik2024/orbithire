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
