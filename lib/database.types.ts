export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: { Row: { id: string; full_name: string | null; school: string | null; created_at: string | null }; Insert: { id: string; full_name?: string | null; school?: string | null; created_at?: string | null }; Update: { full_name?: string | null; school?: string | null } };
      subjects: { Row: { id: string; user_id: string; name: string; created_at: string | null }; Insert: { id?: string; user_id: string; name: string; created_at?: string | null }; Update: { name?: string } };
      tasks: { Row: { id: string; user_id: string; subject_id: string | null; title: string; due_at: string | null; kind: string | null; completed: boolean | null; created_at: string | null }; Insert: { id?: string; user_id: string; subject_id?: string | null; title: string; due_at?: string | null; kind?: string | null; completed?: boolean | null; created_at?: string | null }; Update: { title?: string; subject_id?: string | null; due_at?: string | null; kind?: string | null; completed?: boolean | null } };
      exams: { Row: { id: string; user_id: string; subject_id: string | null; title: string; exam_at: string | null; created_at: string | null }; Insert: { id?: string; user_id: string; subject_id?: string | null; title: string; exam_at?: string | null; created_at?: string | null }; Update: { title?: string; subject_id?: string | null; exam_at?: string | null } };
      study_sessions: { Row: { id: string; user_id: string; subject_id: string | null; title: string; starts_at: string; minutes: number; completed: boolean | null; created_at: string | null }; Insert: { id?: string; user_id: string; subject_id?: string | null; title: string; starts_at: string; minutes: number; completed?: boolean | null; created_at?: string | null }; Update: { title?: string; starts_at?: string; minutes?: number; completed?: boolean | null } };
      flashcard_decks: { Row: { id: string; user_id: string; title: string; subject: string | null; created_at: string | null }; Insert: { id?: string; user_id: string; title: string; subject?: string | null; created_at?: string | null }; Update: { title?: string; subject?: string | null } };
      flashcards: { Row: { id: string; deck_id: string; question: string; answer: string; created_at: string | null }; Insert: { id?: string; deck_id: string; question: string; answer: string; created_at?: string | null }; Update: { question?: string; answer?: string } };
      quizzes: { Row: { id: string; user_id: string; title: string; subject: string | null; created_at: string | null }; Insert: { id?: string; user_id: string; title: string; subject?: string | null; created_at?: string | null }; Update: { title?: string; subject?: string | null } };
      quiz_questions: { Row: { id: string; user_id: string; quiz_id: string | null; subject: string | null; question: string; options: Json; answer: string; created_at: string | null }; Insert: { id?: string; user_id: string; quiz_id?: string | null; subject?: string | null; question: string; options: Json; answer: string; created_at?: string | null }; Update: { question?: string; options?: Json; answer?: string; quiz_id?: string | null; subject?: string | null } };
      quiz_attempts: { Row: { id: string; user_id: string; quiz_id: string | null; score: number; total: number; completed_at: string | null }; Insert: { id?: string; user_id: string; quiz_id?: string | null; score: number; total: number; completed_at?: string | null }; Update: { score?: number; total?: number; completed_at?: string | null } };
      study_materials: { Row: { id: string; user_id: string; subject_id: string | null; title: string; content: string; created_at: string | null }; Insert: { id?: string; user_id: string; subject_id?: string | null; title: string; content: string; created_at?: string | null }; Update: { title?: string; content?: string; subject_id?: string | null } };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
