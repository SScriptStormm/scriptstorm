export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          article_url: string | null
          avoid_topics: string | null
          brand_voice: string | null
          competitor_urls: string | null
          content_goal: string | null
          content_type: string | null
          created_at: string
          delivery_date: string | null
          delivery_deadline: string | null
          delivery_timeframe: number | null
          id: string
          key_points: string | null
          kpis_to_track: string[] | null
          notes: string | null
          reference_links: string | null
          revisions_allowed: number | null
          revisions_requested: number
          specific_instructions: string | null
          status: string
          strategic_goals: string[] | null
          style_preferences: string | null
          target_audience: string | null
          target_keywords: string[] | null
          title: string
          tone: string | null
          updated_at: string
          user_id: string
          word_count: number | null
          youtube_script: boolean | null
          youtube_script_length: number | null
        }
        Insert: {
          article_url?: string | null
          avoid_topics?: string | null
          brand_voice?: string | null
          competitor_urls?: string | null
          content_goal?: string | null
          content_type?: string | null
          created_at?: string
          delivery_date?: string | null
          delivery_deadline?: string | null
          delivery_timeframe?: number | null
          id?: string
          key_points?: string | null
          kpis_to_track?: string[] | null
          notes?: string | null
          reference_links?: string | null
          revisions_allowed?: number | null
          revisions_requested?: number
          specific_instructions?: string | null
          status?: string
          strategic_goals?: string[] | null
          style_preferences?: string | null
          target_audience?: string | null
          target_keywords?: string[] | null
          title: string
          tone?: string | null
          updated_at?: string
          user_id: string
          word_count?: number | null
          youtube_script?: boolean | null
          youtube_script_length?: number | null
        }
        Update: {
          article_url?: string | null
          avoid_topics?: string | null
          brand_voice?: string | null
          competitor_urls?: string | null
          content_goal?: string | null
          content_type?: string | null
          created_at?: string
          delivery_date?: string | null
          delivery_deadline?: string | null
          delivery_timeframe?: number | null
          id?: string
          key_points?: string | null
          kpis_to_track?: string[] | null
          notes?: string | null
          reference_links?: string | null
          revisions_allowed?: number | null
          revisions_requested?: number
          specific_instructions?: string | null
          status?: string
          strategic_goals?: string[] | null
          style_preferences?: string | null
          target_audience?: string | null
          target_keywords?: string[] | null
          title?: string
          tone?: string | null
          updated_at?: string
          user_id?: string
          word_count?: number | null
          youtube_script?: boolean | null
          youtube_script_length?: number | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          ip_address: string | null
          name: string
          processed: boolean | null
          project_details: string | null
          service: string | null
          user_agent: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          name: string
          processed?: boolean | null
          project_details?: string | null
          service?: string | null
          user_agent?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          name?: string
          processed?: boolean | null
          project_details?: string | null
          service?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      content_calendar_events: {
        Row: {
          created_at: string
          description: string | null
          event_type: string
          id: string
          scheduled_date: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_type?: string
          id?: string
          scheduled_date: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_type?: string
          id?: string
          scheduled_date?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      content_revisions: {
        Row: {
          admin_response: string | null
          article_id: string
          created_at: string
          id: string
          revision_notes: string
          status: string
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          article_id: string
          created_at?: string
          id?: string
          revision_notes: string
          status?: string
          user_id: string
        }
        Update: {
          admin_response?: string | null
          article_id?: string
          created_at?: string
          id?: string
          revision_notes?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_revisions_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      edge_function_tokens: {
        Row: {
          active: boolean | null
          created_at: string
          function_name: string
          id: string
          last_used: string | null
          token_hash: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          function_name: string
          id?: string
          last_used?: string | null
          token_hash: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          function_name?: string
          id?: string
          last_used?: string | null
          token_hash?: string
        }
        Relationships: []
      }
      market_roadmaps: {
        Row: {
          created_at: string
          description: string | null
          file_name: string | null
          file_url: string | null
          id: string
          quarter: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          quarter: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          quarter?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      monthly_usage_tracking: {
        Row: {
          articles_submitted: number | null
          created_at: string | null
          id: string
          month_year: string
          product_descriptions_submitted: number | null
          social_posts_submitted: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          articles_submitted?: number | null
          created_at?: string | null
          id?: string
          month_year: string
          product_descriptions_submitted?: number | null
          social_posts_submitted?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          articles_submitted?: number | null
          created_at?: string | null
          id?: string
          month_year?: string
          product_descriptions_submitted?: number | null
          social_posts_submitted?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          client_id: string | null
          content_goal: string | null
          content_type: string | null
          created_at: string | null
          id: number
          keywords: string | null
          progress: number | null
          project_id: string | null
          research_data: Json | null
          seo_outline: Json | null
          status: string | null
          target_audience: string | null
          tier: string | null
          title: string | null
          tone: string | null
          word_count: number | null
        }
        Insert: {
          client_id?: string | null
          content_goal?: string | null
          content_type?: string | null
          created_at?: string | null
          id?: number
          keywords?: string | null
          progress?: number | null
          project_id?: string | null
          research_data?: Json | null
          seo_outline?: Json | null
          status?: string | null
          target_audience?: string | null
          tier?: string | null
          title?: string | null
          tone?: string | null
          word_count?: number | null
        }
        Update: {
          client_id?: string | null
          content_goal?: string | null
          content_type?: string | null
          created_at?: string | null
          id?: number
          keywords?: string | null
          progress?: number | null
          project_id?: string | null
          research_data?: Json | null
          seo_outline?: Json | null
          status?: string | null
          target_audience?: string | null
          tier?: string | null
          title?: string | null
          tone?: string | null
          word_count?: number | null
        }
        Relationships: []
      }
      research_reports: {
        Row: {
          created_at: string
          description: string | null
          file_name: string | null
          file_url: string | null
          id: string
          report_type: string
          title: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          report_type: string
          title: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          report_type?: string
          title?: string
          uploaded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscription_rate_limits: {
        Row: {
          check_count: number | null
          daily_reset: string
          last_check: string
          last_update: string
          update_count: number | null
          user_id: string
        }
        Insert: {
          check_count?: number | null
          daily_reset?: string
          last_check?: string
          last_update?: string
          update_count?: number | null
          user_id: string
        }
        Update: {
          check_count?: number | null
          daily_reset?: string
          last_check?: string
          last_update?: string
          update_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_get_contact_submissions: {
        Args: never
        Returns: {
          company: string
          created_at: string
          email: string
          id: string
          ip_address: string
          name: string
          processed: boolean
          project_details: string
          service: string
        }[]
      }
      admin_update_contact_submission: {
        Args: { mark_processed: boolean; submission_id: string }
        Returns: boolean
      }
      can_submit_content: {
        Args: { p_content_type: string; p_user_id: string }
        Returns: {
          can_submit: boolean
          current_count: number
          message: string
          monthly_limit: number
        }[]
      }
      check_subscription_rate_limit: {
        Args: { operation: string; target_user_id: string }
        Returns: boolean
      }
      current_user_is_admin: { Args: never; Returns: boolean }
      get_contact_submissions_admin: {
        Args: never
        Returns: {
          company: string
          created_at: string
          email: string
          id: string
          ip_address: string
          name: string
          processed: boolean
          project_details: string
          service: string
        }[]
      }
      get_tier_word_count_range: {
        Args: { p_subscription_tier: string }
        Returns: {
          max_words: number
          min_words: number
        }[]
      }
      insert_contact_submission: {
        Args: {
          p_company?: string
          p_email: string
          p_ip_address?: string
          p_name: string
          p_project_details?: string
          p_service?: string
          p_user_agent?: string
        }
        Returns: string
      }
      is_admin: { Args: { _user_id?: string }; Returns: boolean }
      update_contact_submission_admin: {
        Args: { p_id: string; p_processed: boolean }
        Returns: boolean
      }
      validate_edge_function_request: {
        Args: { func_name: string; provided_token: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
