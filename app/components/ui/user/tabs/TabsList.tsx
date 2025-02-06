"use client"

import { useState } from "react"
import Tab from "@components/ui/user/tabs/Tab"

interface TabsListProps {
  tabs: string[]
  children: React.ReactNode[]
}

const TabsList = ({ tabs, children }: TabsListProps) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="flex flex-col w-full max-h-fit bg-zinc-900 rounded-3xl">
      <div className="flex w-full justify-center">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            isActive={activeTab === index}
            setTab={() => setActiveTab(index)}
            index={index}
          >
            <span>{tab}</span>
          </Tab>
        ))}
      </div>
      <div className="w-full">{children[activeTab]}</div>
    </div>
  )
}

export default TabsList
