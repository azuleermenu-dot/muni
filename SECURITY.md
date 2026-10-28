# Security Policy

## Reporting a vulnerability

Please do not publish security vulnerabilities, credentials, student data, or exploit details in a public issue.

Report suspected vulnerabilities privately to the repository maintainer through GitHub's private security reporting features when available.

## Security principles

- Never commit `.env` files or Supabase secret/service-role keys.
- Only the Supabase publishable/anonymous client key may be used in the mobile app.
- Every student-owned table must use Row Level Security (RLS).
- Authorization must be based on `auth.uid()` and database ownership, not editable profile metadata.
- Keep school deployments on separate Supabase projects.
