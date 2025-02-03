import Topbar from "@components/shared/TopBar"
import Sidebar from "@components/shared/Sidebar"
import ContentBoardLayout from "@components/shared/ContentBoardLayout"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col justify-start items-center w-full">
        <div className="flex flex-col w-7/12">
          <Topbar />
          <main className="flex flex-col justify-center items-center space-y-4 w-full">
            <ContentBoardLayout>{children}</ContentBoardLayout>
          </main>
        </div>
      </div>
    </div>
  )
}
