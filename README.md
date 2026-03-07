# Hope Relief - Humanitarian Relief Organization Website

A modern, secure, and multilingual (English/Turkish) website for humanitarian relief organizations built with Next.js 16, PostgreSQL (Neon), and Vercel Blob Storage.

## Features

### Core Functionality
- **Multilingual Support**: Full English and Turkish translations
- **Campaign Management**: Create and manage humanitarian campaigns
- **News & Updates**: Share stories and updates with supporters
- **Volunteer Management**: Accept and track volunteer applications
- **Contact Forms**: Secure contact and inquiry system
- **Newsletter**: Email subscription management
- **Media Library**: Centralized image and asset management
- **Donation Tracking**: Track campaign progress and goals

### Security Features
- Enterprise-grade authentication with JWT and bcrypt
- Rate limiting on all API endpoints
- Input validation with Zod schemas
- SQL injection prevention with parameterized queries
- XSS protection with content sanitization
- CSRF protection with HTTP-only cookies
- Security headers (CSP, X-Frame-Options, etc.)
- Audit logging for admin actions
- File upload validation and size limits
- Admin-only protected routes

### Admin Dashboard
- Campaign management (create, edit, delete)
- News article management
- Media library with upload/delete
- Contact form submissions review
- Volunteer applications review
- Newsletter subscriber list

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **Database**: PostgreSQL (Neon)
- **File Storage**: Vercel Blob
- **Authentication**: JWT with jose + bcrypt
- **Validation**: Zod
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- Neon PostgreSQL database
- Vercel account for Blob storage

### Installation

1. Clone the repository
2. Install dependencies (handled automatically by v0)
3. Set up environment variables (see `.env.example`)
4. Run database migrations from the `scripts` folder
5. Start the development server

### Database Setup

Execute SQL scripts in order:
1. `scripts/001_create_tables.sql` - Create all database tables
2. `scripts/002_seed_data.sql` - Add initial data
3. `scripts/003_add_newsletter_table.sql` - Newsletter subscribers
4. `scripts/004_add_security_tables.sql` - Admin users and audit logs

### Default Admin Credentials



**⚠️ Change these credentials immediately in production!**

## Security

This application implements comprehensive security measures. See [SECURITY.md](./SECURITY.md) for detailed documentation.

### Key Security Features
- Password hashing with bcrypt (12 rounds)
- JWT-based authentication
- Rate limiting per IP address
- Input validation on all forms
- SQL injection prevention
- XSS protection
- CSRF protection
- Secure file uploads
- Admin route protection

## Project Structure

```
├── app/
│   ├── (pages)/           # Public pages
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # React components
├── contexts/              # React contexts (language)
├── lib/                   # Utility functions
│   ├── auth.ts           # Authentication logic
│   ├── db.ts             # Database connection
│   ├── rate-limit.ts     # Rate limiting
│   ├── validation.ts     # Zod schemas
│   └── sanitize.ts       # Input sanitization
├── scripts/               # SQL migration scripts
└── proxy.ts              # Security middleware
```

## API Routes

### Public Endpoints
- `GET /api/campaigns` - List campaigns
- `GET /api/campaigns/[id]` - Get campaign details
- `GET /api/news` - List news articles
- `GET /api/projects` - List projects
- `GET /api/impact-stories` - List impact stories
- `POST /api/contact` - Submit contact form
- `POST /api/volunteers` - Submit volunteer application
- `POST /api/newsletter` - Subscribe to newsletter

### Protected Endpoints (Admin Only)
- `POST /api/campaigns` - Create campaign
- `POST /api/news` - Create news article
- `POST /api/media/upload` - Upload media
- `DELETE /api/media/delete` - Delete media
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

## Contributing

Please read [SECURITY.md](./SECURITY.md) before contributing.

## License

Copyright © 2026 Hope Relief. All rights reserved.
