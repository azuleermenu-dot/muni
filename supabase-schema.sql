create extension if not exists pgcrypto;

create table if not exists profiles (id uuid primary key references auth.users(id) on delete cascade, full_name text, school text default 'Minuyan National High School', created_at timestamptz default now());
create table if not exists subjects (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, name text not null, created_at timestamptz default now());
create table if not exists tasks (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, subject_id uuid references subjects(id) on delete set null, title text not null, due_at timestamptz, kind text default 'assignment', completed boolean default false, created_at timestamptz default now());
create table if not exists flashcard_decks (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, title text not null, subject text, created_at timestamptz default now());
create table if not exists flashcards (id uuid primary key default gen_random_uuid(), deck_id uuid not null references flashcard_decks(id) on delete cascade, question text not null, answer text not null, created_at timestamptz default now());
create table if not exists quiz_questions (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, subject text, question text not null, options jsonb not null, answer text not null, created_at timestamptz default now());

alter table profiles enable row level security;
alter table subjects enable row level security;
alter table tasks enable row level security;
alter table flashcard_decks enable row level security;
alter table flashcards enable row level security;
alter table quiz_questions enable row level security;

create policy "own profile" on profiles for all using (id=auth.uid()) with check (id=auth.uid());
create policy "own subjects" on subjects for all using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "own tasks" on tasks for all using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "own decks" on flashcard_decks for all using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "deck cards" on flashcards for all using (exists(select 1 from flashcard_decks d where d.id=deck_id and d.user_id=auth.uid())) with check (exists(select 1 from flashcard_decks d where d.id=deck_id and d.user_id=auth.uid()));
create policy "own quiz" on quiz_questions for all using (user_id=auth.uid()) with check (user_id=auth.uid());
