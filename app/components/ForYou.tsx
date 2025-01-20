import { ChevronDownIcon } from "@heroicons/react/24/outline"

const ForYou = () => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-white text-[15px] font-semibold">For you</span>
      <button className="flex justify-center h-6 w-6 items-center space-x-2 rounded-full bg-zinc-900 border-[0.5px] border-zinc-700">
        <ChevronDownIcon className="h-3 w-3 text-white" />
      </button>
    </div>
  )
}

export default ForYou
