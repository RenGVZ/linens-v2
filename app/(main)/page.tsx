import { createClient } from "@/utils/supabase/server"
import type { Post as PostType, User } from "@/types/index"
import { redirect } from "next/navigation"
import { Post } from "@components/ui/post"
import CreatePostZone from "@components/shared/CreatePostZone"

export default async function Home() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("posts")
    .select()
    .order("created_at", { ascending: false })
    .returns<PostType[]>()

  const { data: user, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/login")
  }
  const { data: userProfile } = await supabase
    .from("users")
    .select()
    .eq("uuid", user.user?.id)
    .single<User>()

  if (!userProfile) return <div>No user found</div>

  return (
    <>
      <CreatePostZone userProfile={userProfile} />
      <div className="flex flex-col">
        {posts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </>
  )
}
