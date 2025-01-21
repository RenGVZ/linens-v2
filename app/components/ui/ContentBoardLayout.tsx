interface ContentBoardProps {
  children: React.ReactNode
}

const ContentBoard = ({ children }: ContentBoardProps) => {
  return (
    <div className="flex flex-col w-full h-screen bg-zinc-900 rounded-3xl p-6">
      {children}
    </div>
  )
}

export default ContentBoard
