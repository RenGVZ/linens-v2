"use client"

import { usePathname } from "next/navigation"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

const Topbar = () => {
  const pathname = usePathname()
  console.log("pathname:", pathname)

  return (
    <div className="flex justify-center items-center space-x-2 w-full py-5">
      <span className="text-white text-[15px] font-semibold">For you</span>
      <button className="flex justify-center h-6 w-6 items-center space-x-2 rounded-full bg-zinc-900 border-[0.5px] border-zinc-700">
        <ChevronDownIcon className="h-3 w-3 text-white" />
      </button>
    </div>
  )
}

export default Topbar
