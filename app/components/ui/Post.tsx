import type { Post as PostType, User } from "@/types/index"
import { createClient } from "@/utils/supabase/server"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"
import { HeartIcon, ChatBubbleOvalLeftIcon, ArrowsRightLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

const Post = async (post: PostType) => {
  const supabase = await createClient()
  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("uuid", post.user_id)
    .single<User>()
  console.log("user", user)

  const { data: comments } = await supabase.from("comments").select().eq("post_id", post.id)

  console.log("comments", comments)
  return (
    <div className="flex flex-row items-start px-6 py-3 space-x-2 border-b-[0.5px] border-zinc-700">
      <Image
        alt="post user picture"
        src={user?.profile_pic || "/default-avatar.png"}
        width={36}
        height={36}
        className="rounded-full mt-1"
      />
      <div className="flex flex-col items-start space-y-2">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-1">
            <p className="text-white font-semibold">{user?.display_name}</p>
            <CheckBadgeIcon height={14} width={14} color="#0095f6" />
          </div>
          <p className="text-zinc-500">{dayjs(post.created_at).fromNow()}</p>
        </div>
        <p>{post.content}</p>

        <div className="flex flex-row items-center space-x-6 pt-2">
          <button className="flex items-center text-white text-xs space-x-1">
            <HeartIcon className="h-5 w-5" color="white" />
            <span>{post.likes > 0 || ""}</span>
          </button>
          <button className="flex items-center text-white text-xs space-x-1">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" color="white" />
            <span>{comments?.length || ""}</span>
          </button>
          <button className="flex items-center text-white text-xs space-x-1">
            <ArrowsRightLeftIcon className="h-5 w-5" color="white" />
          </button>
          <button className="flex items-center text-white text-xs space-x-1">
            <PaperAirplaneIcon className="h-5 w-5" color="white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post
