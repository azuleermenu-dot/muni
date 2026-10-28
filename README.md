# MUNI — Open Student Study Planner

**MUNI (Minuyan Unified Learning & Information)** is an open-source **mobile app** for planning schoolwork and studying. It is built with React Native + Expo and uses Supabase for authentication and private student data.

The original concept was created for Minuyan National High School, but the codebase is intentionally reusable: **any school can fork it, replace the branding, connect its own Supabase project, and publish its own app.**

## Included now

- Student sign up / sign in with Supabase Auth
- Persistent mobile authentication sessions
- Live student profile and task data
- Assignment/task completion synced to Supabase
- Study planner screen
- Flashcards/review area
- Quiz/reviewer foundation
- Mobile-first UI
- Typed Supabase database client
- RLS-protected student data
- Expo Android/iOS build configuration
- GitHub Actions TypeScript checks

## School customization

Schools can customize the app name, logo, colors, school name, subjects, grade levels, academic calendar, assignments, exams, reviewers, flashcards, quizzes, and other school-specific content.

### Important: separate databases

Every school should use its **own Supabase project**. Never connect a school fork to another school's production database.

## Local setup

1. Fork this repository.
2. Install Node.js 20+ and npm.
3. Copy `.env.example` to `.env`.
4. Create a Supabase project for your school.
5. Put that project's URL and publishable/anonymous key in `.env`.
6. Run the SQL in `supabase-schema.sql` if setting up a fresh project.
7. Run `npm install`.
8. Run `npx expo start`.
9. Open the project with Expo Go or build an Android/iOS app with Expo's build tooling.

## Security

Never commit `.env`, Supabase service-role/secret keys, private student data, or other credentials. The mobile app must only use the Supabase publishable/anonymous client key. Database authorization is enforced with Row Level Security (RLS), using the authenticated user's ID for ownership checks.

See `SECURITY.md` and `CONTRIBUTING.md` before contributing.

## License

MUNI is released under the **MIT License**. Schools, students, teachers, developers, and organizations may use, modify, fork, and redistribute the software subject to the license terms.
