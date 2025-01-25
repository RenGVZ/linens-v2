import ForYou from "@components/ForYou"
import ContentBoardLayout from "@/app/components/ui/ContentBoardLayout"
import { createClient } from "@/utils/supabase/server"
import type { Post as PostType, User } from "@/types/index"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Post from "@components/ui/Post"

export default async function Home() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("posts")
    .select()
    .order("created_at", { ascending: false })
    .returns<PostType[]>()
  console.log(posts)

  const { data: user, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/login")
  }
  const { data: userProfile } = await supabase
    .from("users")
    .select()
    .eq("uuid", user.user?.id)
    .single<User>()
  console.log("userProfile", userProfile)

  return (
    <div className="flex flex-col justify-center items-center space-y-4 w-full">
      <ForYou />
      <ContentBoardLayout>
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
          <div className="flex items-center">
            <button className="h-[36px] bg-zinc-900 text-[15px] text-white flex items-center px-4 py-2 rounded-lg border-zinc-500 border font-semibold">
              Post
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          {posts?.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <Post {...post} />
            </Link>
          ))}
        </div>
      </ContentBoardLayout>
    </div>
  )
}
