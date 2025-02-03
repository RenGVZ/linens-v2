"use client"

import type { User } from "@/types/index"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import {
  NewspaperIcon,
  EllipsisHorizontalCircleIcon,
  PhotoIcon,
  GifIcon,
  HashtagIcon,
  Bars3BottomLeftIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline"
import ProfilePic from "@components/shared/ProfilePic"

interface PostModalProps {
  user: User
  onClose: () => void
}

const PostModal = ({ user, onClose }: PostModalProps) => {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState("")
  const handlePost = async () => {
    setIsLoading(true)
    if (!content.trim()) {
      setIsLoading(false)
      return
    }
    try {
      const { error } = await supabase
        .from("posts")
        .insert({ user_id: user.uuid, content: content.trim() })
      if (error) {
        throw error
      }
      onClose()
      window.location.reload()
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-2xl w-1/2 border-[0.5px] border-zinc-600">
        <div className="w-full flex flex-row items-center justify-between border-b-[0.5px] border-zinc-600 p-2">
          <button className="text-white px-4 py-2 rounded-lg" onClick={onClose}>
            Cancel
          </button>
          <h2 className="text-white text-lg font-semibold">New post</h2>
          <div className="flex items-center space-x-4">
            <NewspaperIcon
              height={24}
              width={24}
              className="text-white"
              color="white"
            />
            <EllipsisHorizontalCircleIcon className="text-white" />
          </div>
        </div>
        <div className="flex flex-row w-full space-x-2 justify-start items-start py-4 px-5">
          <ProfilePic userId={user?.uuid} profilePic={user?.profile_pic} />
          <div className="flex flex-col items-start w-full">
            <h2 className="text-white font-semibold">{user.display_name}</h2>
            <input
              type="text"
              placeholder="What's new?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="relative text-white w-full bg-transparent border-none focus:ring-0 placeholder-zinc-500 focus-visible:outline-none"
            />
            <div className="flex w-full justify-start space-x-3 mt-2">
              <PhotoIcon
                height={20}
                width={20}
                className="text-zinc-500 cursor-pointer"
              />
              <GifIcon
                height={20}
                width={20}
                className="text-zinc-500 cursor-pointer"
              />
              <HashtagIcon
                height={20}
                width={20}
                className="text-zinc-500 cursor-pointer"
              />
              <Bars3BottomLeftIcon
                height={20}
                width={20}
                className="text-zinc-500 cursor-pointer"
              />
              <MapPinIcon
                height={20}
                width={20}
                className="text-zinc-500 cursor-pointer"
              />
            </div>
            <button
              className="mt-4 bg-zinc-800 border-[0.5px] border-zinc-600 py-2 px-4 rounded-lg self-end disabled:opacity-50 disabled:cursor-default cursor-pointer"
              onClick={handlePost}
              disabled={content.length === 0}
            >
              Post
            </button>
          </div>
        </div>
        <div className="flex w-full space-x-2 justify-end"></div>
      </div>
    </div>
  )
}

export default PostModal
