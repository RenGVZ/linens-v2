"use client"
import { useState } from "react"
import ProfilePic from "@components/shared/ProfilePic"
import type { User } from "@/types/index"
import PostModal from "@components/ui/home/PostModal"

interface CreatePostZoneProps {
  userProfile: User
}

const CreatePostZone = ({ userProfile }: CreatePostZoneProps) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)

  return (
    <>
      {isPostModalOpen && (
        <PostModal
          onClose={() => setIsPostModalOpen(false)}
          user={userProfile}
        />
      )}
      <div className="flex justify-between border-b-[0.5px] border-zinc-700 space-x-2 px-6">
        <div className="w-full flex items-center space-x-2 py-5">
          <div className="flex-shrink-0 w-9 mt-1">
            <ProfilePic
              userId={userProfile.uuid}
              profilePic={userProfile?.profile_pic}
            />
          </div>
          <div className="w-full">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="w-full flex items-start text-zinc-500 cursor-text"
            >
              <span>What&apos;s new?</span>
            </button>
          </div>
        </div>
        <CreatePostButton
          isOpen={isPostModalOpen}
          setIsOpen={setIsPostModalOpen}
        />
      </div>
    </>
  )
}

interface CreatePostButtonProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const CreatePostButton = ({ isOpen, setIsOpen }: CreatePostButtonProps) => {
  return (
    <div className="flex items-center">
      <button
        className="h-[36px] bg-zinc-900 text-[15px] text-white flex items-center px-4 py-2 rounded-lg border-zinc-500 border font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        Post
      </button>
    </div>
  )
}

export default CreatePostZone
