import { createClient } from "@/utils/supabase/server"
import ProfilePic from "@components/shared/ProfilePic"
import CreatePostZone from "@components/shared/CreatePostZone"
import { TabsList } from "@components/ui/user/tabs"
import { ChartBarSquareIcon, CameraIcon } from "@heroicons/react/24/outline"
import { Post } from "@components/ui/post/index"
import type { Post as PostType } from "@/types/index"

const UserPage = async ({ params }: { params: { slug: string } }) => {
  const supabase = await createClient()
  const { slug } = await params

  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("uuid", slug)
    .single()

  const { data: userPosts } = await supabase
    .from("posts")
    .select()
    .in("id", userData?.post_ids)
    .order("created_at", { ascending: false })

  const { data: likedPosts } = await supabase
    .from("posts")
    .select()
    .in("id", userData?.liked_posts)
    .order("created_at", { ascending: false })

  const userPostsContent = () => {
    if (userPosts) {
      return userPosts.map((post: PostType) => <Post key={post.id} {...post} />)
    } else {
      return <CreatePostZone userProfile={userData} />
    }
  }

  const userLikedPostsContent = () => {
    if (likedPosts) {
      return likedPosts.map((post: PostType) => (
        <Post key={post.id} {...post} />
      ))
    } else {
      return <div className="h-full w-full text-center">No liked posts</div>
    }
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col w-full px-6 py-10">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold">{userData.display_name}</h1>
            <p className="text-[15px]">{userData?.email}</p>
          </div>
          <ProfilePic
            userId={userData.uuid}
            profilePic={userData.profile_pic}
            size="large"
          />
        </div>
        <div className="w-full pt-4">
          <span className="text-[15px]">{userData.bio}</span>
        </div>
        <div className="w-full flex justify-between py-3">
          <div className="text-zinc-500">followers</div>
          <div className="flex space-x-2">
            <ChartBarSquareIcon height={24} width={24} />
            <CameraIcon height={24} width={24} />
          </div>
        </div>
        <div className="py-3">
          <button className="w-full flex justify-center border-[0.5px] border-zinc-700 rounded-lg">
            <span className="text-[15px] font-semibold p-1.5">
              Edit profile
            </span>
          </button>
        </div>
      </div>
      <TabsList tabs={["Posts", "Liked Posts"]}>
        <>{userPostsContent()}</>
        <>{userLikedPostsContent()}</>
      </TabsList>
    </div>
  )
}

export default UserPage
