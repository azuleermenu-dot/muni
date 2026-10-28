# Contributing to MUNI

MUNI is open source so schools and developers can create their own branded student study apps.

## Safe contribution rules

1. Fork the repository rather than pushing directly to `main`.
2. Keep school-specific branding/configuration separate from core functionality.
3. Never commit credentials, `.env` files, student information, or Supabase secret/service-role keys.
4. Do not weaken or remove RLS policies without a documented security reason and review.
5. Run `npm install` and `npm run typecheck` before opening a pull request.
6. Keep dependency versions pinned and review dependency changes carefully.
7. Pull requests that affect authentication, authorization, database schema, or security require maintainer review.

## School forks

Schools are encouraged to fork MUNI and connect the fork to a separate Supabase project. Do not connect a school fork to another school's production database.
