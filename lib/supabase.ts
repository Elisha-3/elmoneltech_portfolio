import { createClient } from '@supabase/supabase-js'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// null when the env vars are missing, so the site still builds and renders
// (reviews are simply unavailable) instead of crashing at prerender time.
export const supabase = url && key ? createClient(url, key) : null

export type Review = {
  id: string
  name: string
  company: string | null
  rating: number
  message: string
  created_at: string
}
