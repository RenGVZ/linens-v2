"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/utils/supabase/server"

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const userData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { data, error } = await supabase.auth.signUp(userData)
  // I want to also create a user profile in the user table with this information
  // so I can use it in other parts of the app
  await supabase.from("users").insert({ uuid: data.user?.id, email: data.user?.email })

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/")
}
