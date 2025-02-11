import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function PUT(
  request: Request,
  params: { params: { id: string } }
) {
  const supabase = await createClient()
  const liked_post = await params.params

  try {
    const { action, user_id } = await request.json()

    switch (action) {
      case "like":
        const { data: post } = await supabase
          .from("posts")
          .select()
          .eq("id", liked_post.id)
          .single()

        const { data: user } = await supabase
          .from("users")
          .select()
          .eq("uuid", user_id)
          .single()

        if (user.liked_posts.includes(liked_post.id)) {
          return NextResponse.json({ error: "ALREADY_LIKED" }, { status: 409 })
        }

        const { error: postUpdateError } = await supabase
          .from("posts")
          .update({ likes: (post?.likes || 0) + 1 })
          .eq("id", liked_post.id)

        if (postUpdateError) throw postUpdateError

        const newLikedPosts = user?.liked_posts
          ? [...user.liked_posts, liked_post.id]
          : [liked_post.id]

        const { error: userError } = await supabase
          .from("users")
          .update({ liked_posts: newLikedPosts })
          .eq("uuid", user_id)

        if (userError) throw userError

        break

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
    revalidatePath("/")
    revalidatePath(`/user/${user_id}`)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "An error occurred while updating the post" },
      { status: 500 }
    )
  }
}
