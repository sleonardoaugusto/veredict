'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarIcon, CogIcon } from '@heroicons/react/24/outline'
import type { ReactNode } from 'react'

export default function NavigationMenu() {
  const pathname = usePathname()

  if (pathname === '/login') return null

  return (
    <div className="group h-screen w-16 hover:w-64 bg-foreground text-surface p-4 transition-all duration-300 ease-in-out overflow-hidden flex flex-col mr-2">
      <h2 className="text-xl font-semibold mb-6 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Menu
      </h2>

      <nav className="flex flex-col space-y-4">
        <NavItem
          href="/appointments"
          label="Atendimentos"
          icon={<CalendarIcon className="h-5 w-5" />}
          active={pathname === '/appointments'}
        />
        <NavItem
          href="/processings"
          label="Processamentos"
          icon={<CogIcon className="h-5 w-5" />}
          active={pathname === '/processings'}
        />
      </nav>
    </div>
  )
}

interface NavItemProps {
  href: string
  label: string
  icon: ReactNode
  active?: boolean
}

function NavItem({ href, label, icon, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-2 py-2 rounded-md transition-colors ${
        active
          ? 'bg-[#2B3C4F] text-white'
          : 'text-indigo-200 hover:bg-[#2B3C4F] hover:text-white'
      }`}
    >
      <span>{icon}</span>
      <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </Link>
  )
}
