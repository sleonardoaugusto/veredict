import { ReactNode } from 'react'

interface CollapseProps {
  title: ReactNode
  children: ReactNode
}

export default function Collapse({ title, children }: CollapseProps) {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow border border-border bg-surface text-foreground"
    >
      <input type="checkbox" />
      <div className="collapse-title font-semibold text-base">{title}</div>
      <div className="collapse-content text-sm">{children}</div>
    </div>
  )
}
