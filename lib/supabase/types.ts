export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          role: 'student' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          role?: 'student' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'student' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      course_progress: {
        Row: {
          id: string
          user_id: string
          course_slug: string
          completed_lesson_ids: string[]
          last_lesson_id: string | null
          completed: boolean
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_slug: string
          completed_lesson_ids?: string[]
          last_lesson_id?: string | null
          completed?: boolean
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_slug?: string
          completed_lesson_ids?: string[]
          last_lesson_id?: string | null
          completed?: boolean
          updated_at?: string
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
