'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarIcon, CogIcon } from '@heroicons/react/24/outline'

export default function NavigationMenu() {
  const pathname = usePathname()

  return (
    <div className="group h-screen w-16 hover:w-64 bg-indigo-50 text-indigo-900 p-4 border-r border-indigo-100 transition-all duration-300 ease-in-out overflow-hidden flex flex-col">
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
  icon: React.ReactNode
  active?: boolean
}

function NavItem({ href, label, icon, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-2 py-2 rounded-md transition-colors ${
        active ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-indigo-100'
      }`}
    >
      <span>{icon}</span>
      <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {label}
      </span>
    </Link>
  )
}
