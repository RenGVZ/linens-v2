import ForYou from "@components/ForYou"
import ContentBoardLayout from "@/app/components/ui/ContentBoardLayout"
import { createClient } from "@/utils/supabase/server"
import type { Post, User } from "@/types/index"
import { redirect } from "next/navigation"
import Image from "next/image"

export default async function Home() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("posts")
    .select()
    .returns<Post[]>()
  console.log(posts)

  const { data: user, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/login")
  }
  console.log("user", user)
  const { data: userProfile } = await supabase
    .from("users")
    .select()
    .eq("uuid", user.user?.id)
    .returns<User[]>()
  console.log("userProfile", userProfile)

  return (
    <div className="flex w-9/12 justify-center items-start h-screen py-4">
      <div className="flex flex-col justify-center items-center space-y-4 w-full">
        <ForYou />
        <ContentBoardLayout>
          <div className="flex justify-between border-b-2 h-16">
            <div className="flex items-center space-x-2">
              <Image
                alt="profile picture"
                src={userProfile?.[0]?.profile_pic || "/default-avatar.png"}
                width={36}
                height={36}
                className="rounded-full"
              />
            </div>
          </div>
          {posts?.map((post) => (
            <div key={post.id}>
              <h2>{post.content}</h2>
            </div>
          ))}
        </ContentBoardLayout>
      </div>
    </div>
  )
}
