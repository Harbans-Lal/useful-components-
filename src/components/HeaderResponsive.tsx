'use client'

import { useState, createContext, useContext, useEffect, ReactNode } from 'react'
import { MenuIcon, X } from 'lucide-react'
import Link from 'next/link'
import { Drawer as VaulHeader } from 'vaul'
// import { useMediaQuery } from '@/hooks/use-media-query'

const items = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/dzl9yxixg/image/upload/v1715161336/eugene-golovesov-K6oxS4dwihg-unsplash_yylgnx.jpg',
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dzl9yxixg/image/upload/v1715161336/eugene-golovesov-XQq_xRecUSw-unsplash_simrjg.jpg',
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dzl9yxixg/image/upload/v1715161336/eugene-golovesov-beIRDp7-Dt0-unsplash_oop0nx.jpg',
  },
]

interface DrawerContextProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined)

const useSidebarDrawer = () => {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider')
  }
  return context
}

interface DrawerSidebarProps {
  children: ReactNode
  open?: boolean
  setOpen?: (open: boolean) => void
  drawerBtn?: any | null
}

const HeaderDrawer = ({
  children,
  open: controlledOpen,
  setOpen: controlledSetOpen,
  drawerBtn
}: DrawerSidebarProps) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = controlledSetOpen !== undefined ? controlledSetOpen : setInternalOpen
//   const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      <VaulHeader.Root
        open={open}
        direction="top"
        onOpenChange={setOpen}
        // dismissible={!isDesktop}
      >
        {drawerBtn && (
          <VaulHeader.Trigger asChild>
            {drawerBtn()}
          </VaulHeader.Trigger>
        )}
        <VaulHeader.Portal>
          <VaulHeader.Overlay className="fixed inset-0 dark:bg-black/40 bg-white/50 backdrop-blur-sm z-50" />
          <VaulHeader.Content className="dark:bg-gray-900 bg-white border-b z-50 w-full h-fit py-3 fixed top-0 left-0">
            {children}
          </VaulHeader.Content>
        </VaulHeader.Portal>
      </VaulHeader.Root>
    </DrawerContext.Provider>
  )
}

export default function Header() {
  const [headerOpen, setHeaderOpen] = useState(false)

  return (
    <>
      <header className="flex justify-between border items-center p-3 rounded-md dark:bg-black/45 backdrop-blur-md">
        <h1>Logo</h1>
        <HeaderDrawer open={headerOpen} setOpen={setHeaderOpen} drawerBtn={() => <button><MenuIcon /></button>}>
          <div className="container mx-auto gap-4">
            <div className="flex justify-between items-center border-b">
              {/* {!useMediaQuery('(min-width: 768px)') && (
                <button className="flex justify-start p-2 mb-2 rounded-md dark:bg-white dark:text-black bg-black text-white" onClick={() => setHeaderOpen(false)}>
                  <X />
                </button>
              )} */}
              <h1 className="mx-auto text-2xl">UI-LAYOUT</h1>
            </div>
            <div className="flex justify-between py-2">
              <nav className="flex gap-8">
                <ul className="xl:text-2xl text-lg space-y-2 xl:space-y-4 font-semibold uppercase pr-8">
                  {['/', '/components', '/layouts', '/templates', '/open-source'].map((url, index) => (
                    <li key={index}>
                      <Link href={url} className="relative flex items-center gap-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 dark:after:bg-white after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">
                        {url === '/' ? 'Home' : url.substring(1).replace('-', ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="grid grid-cols-3 gap-4 py-4 pr-20">
                {items.map(item => (
                  <figure key={item.id} className="inline-block group w-full xl:h-52 h-full relative">
                    <img src={item.url} className="w-full bg-base-100 object-cover shadow-xl rounded-sm h-full cursor-pointer" alt={`Image ${item.id}`} />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </HeaderDrawer>
      </header>
    </>
  )
}
