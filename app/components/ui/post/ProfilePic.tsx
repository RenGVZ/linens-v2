"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

interface ProfilePicProps {
  userId: string
  profilePic: string
}

const ProfilePic = ({ userId, profilePic }: ProfilePicProps) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/user/${userId}`)
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Image
        alt="post user picture"
        src={profilePic || "/default-avatar.png"}
        width={36}
        height={36}
        className="rounded-full mt-1"
      />
    </div>
  )
}

export default ProfilePic
