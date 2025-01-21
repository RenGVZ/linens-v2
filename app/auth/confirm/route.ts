import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import type { NextRequest } from "next/server"
import { type EmailOtpType } from "@supabase/supabase-js"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null
  const next = searchParams.get("next") ?? "/"

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    console.log("error", error);

    if (!error) {
      // Get the user data after verification
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Create user profile in users table
        const { error: profileError } = await supabase.from("users").insert([
          {
            uuid: user.id,
            email: user.email,
            created_at: new Date().toISOString(),
          },
        ])

        if (profileError) {
          console.error("Error creating user profile:", profileError)
          redirect("/error")
        }
      }

      redirect(next)
    }
  }

  redirect("/error")
}
