import { createClient } from "@/utils/supabase/server"
import type { Post as PostType, User } from "@/types/index"
import { redirect } from "next/navigation"
import Image from "next/image"
import Post from "@components/ui/Post"
import CreatePostButton from "@components/ui/CreatePostButton"

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

  return (
    <>
      <div className="flex justify-between border-b-[0.5px] border-zinc-700 px-6">
        <div className="flex items-center space-x-2 py-5">
          <Image
            alt="profile picture"
            src={userProfile?.profile_pic || "/default-avatar.png"}
            width={36}
            height={36}
            className="rounded-full"
          />
          <p className="text-zinc-500">What&apos;s new?</p>
        </div>
        {userProfile && <CreatePostButton user={userProfile} />}
      </div>
      <div className="flex flex-col">
        {posts?.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </>
  )
}
