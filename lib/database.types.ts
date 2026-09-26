export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.5';
  };
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          company: string | null;
          country: string | null;
          created_at: string;
          email: string;
          id: string;
          message: string;
          name: string;
        };
        Insert: {
          company?: string | null;
          country?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          message: string;
          name: string;
        };
        Update: {
          company?: string | null;
          country?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          message?: string;
          name?: string;
        };
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: {
          email: string;
          id: string;
          locale: string;
          source_page: string | null;
          subscribed_at: string;
        };
        Insert: {
          email: string;
          id?: string;
          locale: string;
          source_page?: string | null;
          subscribed_at?: string;
        };
        Update: {
          email?: string;
          id?: string;
          locale?: string;
          source_page?: string | null;
          subscribed_at?: string;
        };
        Relationships: [];
      };
      rfq_requests: {
        Row: {
          company: string | null;
          country: string;
          created_at: string;
          email: string;
          id: string;
          message: string | null;
          name: string;
          phone: string | null;
        };
        Insert: {
          company?: string | null;
          country: string;
          created_at?: string;
          email: string;
          id?: string;
          message?: string | null;
          name: string;
          phone?: string | null;
        };
        Update: {
          company?: string | null;
          country?: string;
          created_at?: string;
          email?: string;
          id?: string;
          message?: string | null;
          name?: string;
          phone?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
