import Logo from "@components/ui/Logo"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center py-4 px-6">
      <Logo />
      <div>
        <button className="flex justify-center h-6 w-6 items-center space-x-2 rounded-full bg-zinc-900 border-[0.5px] border-zinc-700">
          <ChevronDownIcon className="h-3 w-3 text-white" />
        </button>
      </div>
    </div>
  )
}

export default Header
