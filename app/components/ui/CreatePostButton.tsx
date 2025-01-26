"use client"
import { useState } from "react"
import type { User } from "@/types/index"
import PostModal from "./PostModal"

interface CreatePostButtonProps {
  user: User
}

const CreatePostButton = ({ user }: CreatePostButtonProps) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  return (
    <div className="flex items-center">
      {isPostModalOpen && <PostModal onClose={() => setIsPostModalOpen(false)} user={user} />}
      <button
        className="h-[36px] bg-zinc-900 text-[15px] text-white flex items-center px-4 py-2 rounded-lg border-zinc-500 border font-semibold"
        onClick={() => setIsPostModalOpen(true)}
      >
        Post
      </button>
    </div>
  )
}

export default CreatePostButton