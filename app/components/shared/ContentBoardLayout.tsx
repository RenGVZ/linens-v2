interface ContentBoardProps {
  children: React.ReactNode
}

const ContentBoard = ({ children }: ContentBoardProps) => {
  return (
    <div className="flex flex-col w-full min-h-screen max-h-fit bg-zinc-900 rounded-3xl">
      {children}
    </div>
  )
}

export default ContentBoard
