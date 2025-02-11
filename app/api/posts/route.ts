import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  const supabase = await createClient()

  try {
    const body = await request.json()

    if (!body.content || !body.user_id) {
      return NextResponse.json(
        { error: "Please provide content and uid" },
        { status: 400 }
      )
    }

    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        content: body.content,
        user_id: body.user_id,
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath("/")
    revalidatePath(`/user/${body.user_id}`)

    return NextResponse.json({ data: post }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "An error occurred while creating the post" },
      { status: 500 }
    )
  }
}
