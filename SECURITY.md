# Security Documentation

This document outlines the comprehensive security measures implemented in the Hope Relief humanitarian website.

## Authentication & Authorization

### Password Security
- **Bcrypt Hashing**: All passwords are hashed using bcrypt with 12 salt rounds
- **Strong Password Policy**: Minimum 8 characters required
- **Session Management**: JWT tokens with 7-day expiration
- **HTTP-Only Cookies**: Session tokens stored in secure, HTTP-only cookies

### Admin Protection
- All admin routes protected by middleware in `proxy.ts`
- JWT verification on every admin request
- Automatic redirect to login for unauthorized access
- Role-based access control (RBAC) implemented

## Rate Limiting

Comprehensive rate limiting to prevent abuse:

- **Login**: 5 attempts per 15 minutes per IP
- **Contact Forms**: 3 submissions per hour per IP
- **Volunteer Forms**: 2 submissions per hour per IP
- **Newsletter**: 5 subscriptions per hour per IP
- **API Endpoints**: 100 requests per minute per IP

## Input Validation

### Zod Schema Validation
All user inputs are validated using Zod schemas:

- Campaign data validation
- News article validation
- Contact form validation
- Volunteer application validation
- Newsletter subscription validation
- Login credentials validation

### SQL Injection Prevention
- All database queries use parameterized queries via Neon's tagged templates
- No string concatenation in SQL queries
- Input sanitization for additional protection

### XSS Prevention
- HTML sanitization utilities in `lib/sanitize.ts`
- Escape functions for user-generated content
- Content Security Policy headers

## File Upload Security

### Media Upload Protection
- File type validation (images only)
- File size limit: 10MB maximum
- Filename sanitization (removes special characters)
- Admin-only access to upload endpoint
- Metadata stored in database with content tracking

### Allowed File Types
- image/jpeg
- image/jpg
- image/png
- image/gif
- image/webp

## Security Headers

Implemented via `proxy.ts` middleware:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: Comprehensive CSP policy
```

## Database Security

### Row-Level Security
- Prepared statements for all queries
- Parameterized queries prevent SQL injection
- Connection string stored in environment variables

### Audit Logging
- All admin actions logged to `audit_logs` table
- Tracks user ID, action, entity type, changes, IP address
- Indexed for fast querying

## Environment Variables

Required secure environment variables:

```
# Database (Neon)
DATABASE_URL=<neon_connection_string>

# Blob Storage (Vercel)
BLOB_READ_WRITE_TOKEN=<vercel_blob_token>

# Authentication (Generate secure secret)
JWT_SECRET=<your-secure-jwt-secret>
NODE_ENV=production
```

## API Security

### Public Endpoints (Rate Limited)
- GET /api/campaigns
- GET /api/campaigns/[id]
- GET /api/news
- GET /api/projects
- GET /api/impact-stories
- POST /api/contact
- POST /api/volunteers
- POST /api/newsletter

### Protected Endpoints (Admin Only)
- POST /api/campaigns
- POST /api/news
- POST /api/media/upload
- DELETE /api/media/delete
- All admin dashboard routes

## Best Practices Implemented

1. **Principle of Least Privilege**: Users only have access to necessary resources
2. **Defense in Depth**: Multiple layers of security (validation, rate limiting, authentication)
3. **Secure by Default**: All routes protected unless explicitly public
4. **Input Validation**: Never trust user input, validate everything
5. **Error Handling**: Generic error messages to prevent information leakage
6. **Logging**: Comprehensive audit trail for security events
7. **HTTPS Enforcement**: Secure cookies only in production
8. **Session Security**: Short-lived tokens with automatic expiration

## Security Checklist for Production

- [ ] Change JWT_SECRET to a strong random value (minimum 32 characters)
- [ ] Enable HTTPS/SSL certificates
- [ ] Review and tighten Content Security Policy
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Enable Vercel's DDoS protection
- [ ] Set up monitoring and alerting
- [ ] Review audit logs regularly
- [ ] Implement automated security scanning
- [ ] Keep dependencies updated

## Reporting Security Issues

If you discover a security vulnerability, please email: security@hoprelief.org

**Do not** create public GitHub issues for security vulnerabilities.

## Regular Security Audits

Recommended security audit schedule:
- Monthly: Review audit logs
- Quarterly: Update dependencies
- Annually: Full security penetration testing
