"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import AnonProfile from "@/public/assets/profile_anon.svg"

interface ProfilePicProps {
  userId: string
  profilePic?: string
  size?: "small" | "large"
}

const ProfilePic = ({
  userId,
  profilePic,
  size = "small",
}: ProfilePicProps) => {
  const router = useRouter()
  const [imgSrc, setImgSrc] = useState(profilePic || AnonProfile.src)

  const getSize = (size: string) => {
    if (size === "small") {
      return 36
    } else if (size === "large") {
      return 48
    } else {
      return 36
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/user/${userId}`)
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Image
        alt="post user picture"
        src={imgSrc}
        width={getSize(size)}
        height={getSize(size)}
        className="rounded-full mt-1"
        onError={() => {
          setImgSrc(AnonProfile.src)
        }}
      />
    </div>
  )
}

export default ProfilePic
