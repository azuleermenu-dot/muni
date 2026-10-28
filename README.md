# MUNI — Open Student Study Planner

**MUNI (Minuyan Unified Learning & Information)** is an open-source mobile study planner and review app for students.

The original concept was created for Minuyan National High School, but the codebase is intentionally designed so **any school can copy, customize, self-host, and build its own branded version**.

## What schools can customize

- School name and logo
- App name and branding
- Subjects and grade levels
- Academic calendar
- Study schedules
- Assignment and exam workflows
- Flashcard/reviewer content
- Quiz content
- Colors and visual identity

## Features

- Student dashboard
- Study planner
- Assignment tracking
- Exam tracking
- Flashcards
- Practice quizzes
- Review materials
- Study progress and streaks
- Supabase authentication/database integration
- Mobile-first React Native + Expo architecture

## Tech stack

- React Native
- Expo
- TypeScript
- Supabase

## Create your school's version

1. Fork this repository.
2. Rename the app in `app.json`.
3. Replace the school branding and configuration.
4. Create your own Supabase project.
5. Apply `supabase-schema.sql` to your database.
6. Add your environment variables from `.env.example`.
7. Run the Expo app locally.
8. Build your Android/iOS app with Expo's build tooling.

No Minuyan-specific student data is included in this repository.

## License

This project is released under the **MIT License**. Schools, students, teachers, developers, and organizations may use, modify, fork, and redistribute the software subject to the license terms.
