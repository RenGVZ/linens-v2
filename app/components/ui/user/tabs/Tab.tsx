const Tab = ({
  children,
  setTab,
  isActive,
  index,
}: {
  children: React.ReactNode
  setTab: (num: number) => void
  isActive: boolean
  index: number
}) => {
  return (
    <div
      className={`w-full cursor-pointer flex items-center justify-center pb-3 font-bold text-[15px] ${
        isActive
          ? "text-white border-b border-white"
          : "text-zinc-700 border-b border-zinc-700"
      }`}
      onClick={() => setTab(index)}
    >
      {children}
    </div>
  )
}

export default Tab
