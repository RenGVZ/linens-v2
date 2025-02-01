import Logo from "@components/ui/Logo"
import Link from "next/link"
import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid"
import { HeartIcon, UserIcon, EyeDropperIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/outline"

const MiddleMenuItems = () => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-800">
        <HomeIcon className="h-8 w-8" />
      </Link>
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-800">
        <MagnifyingGlassIcon className="h-8 w-8" />
      </Link>
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-800">
        <PlusIcon className="h-8 w-8" />
      </Link>
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-800">
        <HeartIcon className="h-8 w-8" />
      </Link>
      <Link href="/" className="text-sm text-gray-400 hover:text-gray-800">
        <UserIcon className="h-8 w-8" />
      </Link>
    </div>
  )
}

const BottomMenuItems = () => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <button className="text-sm text-gray-400 hover:text-gray-800">
        <EyeDropperIcon className="h-8 w-8" />
        <Link href="/" />
      </button>
      <button className="text-sm text-gray-400 hover:text-gray-800">
        <Bars3BottomLeftIcon className="h-8 w-8" />
        <Link href="/" />
      </button>
    </div>
  )
}

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between items-start pt-4 pb-10 px-6 max-w-20 h-screen">
      <Logo />
      <MiddleMenuItems />
      <BottomMenuItems />
    </div>
  )
}

export default Sidebar
