"use client"

import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid"
import type { User } from "@/types"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface LikeButtonProps {
  likes: number
  post_id: string
  poster: User
}

const LikeButton = ({ likes, post_id, poster }: LikeButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isLoading) return
    setIsLoading(true)

    try {
      const response = await fetch(`/api/posts/${post_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "like",
          user_id: poster.uuid,
        }),
      })

      if (!response.ok) {
        if (response.status === 409) {
          console.log("You have already liked this post")
          return
        }
        throw new Error("Failed to like post")
      }

      router.refresh()
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
