"use client"

import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid"
import { createClient } from "@/utils/supabase/client"
import type { User } from "@/types"
import { useState } from "react"

interface LikeButtonProps {
  likes: number
  post_id: string
  poster: User
}

const LikeButton = ({ likes, post_id, poster }: LikeButtonProps) => {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)

  const updatePostLikes = async () => {
    const { error } = await supabase
      .from("posts")
      .update({ likes: likes + 1 })
      .eq("id", post_id)

    if (error) throw error
  }

  const updateUserLikedPosts = async () => {
    const newLikedPosts = poster?.liked_posts
      ? [...poster.liked_posts, post_id]
      : [post_id]

    const { error } = await supabase
      .from("users")
      .update({ liked_posts: newLikedPosts })
      .eq("uuid", poster.uuid)

    if (error) {
      if (error.message.includes("is already in liked_posts array")) {
        throw new Error("ALREADY_LIKED")
      }
      throw error
    }
  }

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation() // Stop event propagation here
    if (isLoading) return
    setIsLoading(true)

    try {
      await updateUserLikedPosts()
      await updatePostLikes()

      window.location.reload()
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "ALREADY_LIKED") {
          console.log("You have already liked this post")
          return
        }
      }
      console.error("Error liking post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isLiked = poster?.liked_posts?.includes(post_id)

  return (
    <button
      className="flex items-center text-white text-xs space-x-1"
      onClick={handleLike}
      disabled={isLoading}
    >
      {isLiked ? (
        <FilledHeartIcon height={20} width={20} color="red" />
      ) : (
        <HeartIcon height={20} width={20} color="white" />
      )}
      <span>{likes > 0 ? likes : ""}</span>
    </button>
  )
}

export default LikeButton
