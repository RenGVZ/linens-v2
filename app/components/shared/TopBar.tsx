"use client"

import { usePathname } from "next/navigation"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

const ForYou = () => {
  return (
    <>
      <span className="text-white text-[15px] font-semibold">For you</span>
      <button className="flex justify-center h-6 w-6 items-center space-x-2 rounded-full bg-zinc-900 border-[0.5px] border-zinc-700">
        <ChevronDownIcon width={12} height={12} className="text-white" />
      </button>
    </>
  )
}

const Topbar = () => {
  const pathname = usePathname()

  const pageContent = (path: string) => {
    switch (path) {
      case "/":
        return <ForYou />
      default:
        return (
          <></>
        )
    }
  }

  return (
    <div className="flex justify-center items-center space-x-2 w-full py-5">
      {pageContent(pathname)}
    </div>
  )
}

export default Topbar
