import { createServerClient } from '@supabase/ssr'

export async function createClient() {
  return createServerClient(
    "https://eqlatpimljraiapadkww.supabase.co",
    "sb_publishable_kXB2sVbVHQl-smxeaUS9NA_yN4fxK-z",
    {
      cookies: {
        getAll() {
          return []
        },
      },
    }
  )
}