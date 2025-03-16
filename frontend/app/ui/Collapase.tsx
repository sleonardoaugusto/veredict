import { ReactNode } from 'react'

interface CollapseProps {
  title: string
  children: ReactNode
}

export default function Collapse({ title, children }: CollapseProps) {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow bg-base-100 border-base-300 border"
    >
      <input type="checkbox" />
      <div className="collapse-title font-semibold">{title}</div>
      <div className="collapse-content text-sm">{children}</div>
    </div>
  )
}
