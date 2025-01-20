import ForYou from "@components/ForYou"
import ContentBoard from "@components/ContentBoard"

export default function Home() {
  return (
    <div className="flex w-9/12 justify-center items-start h-screen py-4">
      <div className="flex flex-col justify-center items-center space-y-4 w-full">
        <ForYou />
        <ContentBoard />
      </div>
    </div>
  )
}
