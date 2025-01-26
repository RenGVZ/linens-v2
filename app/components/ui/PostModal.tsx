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
import Image from "next/image"

interface PostModalProps {
  user: User
  onClose: () => void
}

const PostModal = ({ user, onClose }: PostModalProps) => {
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState("")
  const handlePost = async () => {
    console.log("asdasd")
    setIsLoading(true)
    if (!content.trim()) {
      setIsLoading(false)
      return
    }
    try {
      const { error } = await supabase
        .from("posts")
        .insert({ user_id: user.uuid, content: content.trim() })
      console.log(content)
      if (error) {
        throw error
      }
      onClose()
      window.location.reload()
    } catch (error) {
      console.log("Error creating post:", error)
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
            <NewspaperIcon className="h-6 w-6 text-white" color="white" />
            <EllipsisHorizontalCircleIcon className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="flex flex-row w-full space-x-2 justify-start items-start py-4 px-5">
          <Image
            alt="post user picture"
            src={user.profile_pic || "/default-avatar.png"}
            width={36}
            height={36}
            className="rounded-full mt-1"
          ></Image>
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
              <PhotoIcon className="h-5 w-5 text-zinc-500 cursor-pointer" />
              <GifIcon className="h-5 w-5 text-zinc-500 cursor-pointer" />
              <HashtagIcon className="h-5 w-5 text-zinc-500 cursor-pointer" />
              <Bars3BottomLeftIcon className="h-5 w-5 text-zinc-500 cursor-pointer" />
              <MapPinIcon className="h-5 w-5 text-zinc-500 cursor-pointer" />
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
