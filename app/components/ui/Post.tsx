import type { Post as PostType, User } from "@/types/index"
import { createClient } from "@/utils/supabase/server"
import { CheckBadgeIcon } from "@heroicons/react/24/solid"
import {
  ChatBubbleOvalLeftIcon,
  ArrowsRightLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import LikeButton from "./post/LikeButton"
import Link from "next/link"
import ProfilePic from "./post/ProfilePic"
dayjs.extend(relativeTime)

const Post = async (post: PostType) => {
  const supabase = await createClient()
  const { data: poster } = await supabase
    .from("users")
    .select()
    .eq("uuid", post.user_id)
    .single<User>()

  const { data: comments } = await supabase
    .from("comments")
    .select()
    .eq("post_id", post.id)

  if (!poster) {
    return <div>Owner of post not found</div>
  }

  return (
    <div className="flex flex-row items-start px-6 py-3 space-x-2 border-b-[0.5px] border-zinc-700">
      <div className="flex-shrink-0 w-9">
        <ProfilePic userId={post.user_id} profilePic={poster?.profile_pic} />
      </div>
      <div className="flex flex-col items-start space-y-2 min-w-0 flex-1">
        <Link
          href={`/post/${post.id}`}
          className="flex flex-col items-start space-y-2 w-full"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center space-x-1">
              <p className="text-white font-semibold">{poster?.display_name}</p>
              <CheckBadgeIcon height={14} width={14} color="#0095f6" />
            </div>
            <p className="text-zinc-500">{dayjs(post.created_at).fromNow()}</p>
          </div>
          <p className="break-words">{post.content}</p>
        </Link>

        <div className="flex flex-row items-center space-x-6 pt-2">
          <LikeButton likes={post.likes} post_id={post.id} poster={poster} />
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
