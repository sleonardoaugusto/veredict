import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClickAction?: () => void
}
export default function Button({
  children,
  onClickAction,
  ...props
}: ButtonProps) {
  const handleClick = () => {
    if (onClickAction) onClickAction()
  }
  return (
    <div>
      <button
        className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-normal border border-indigo-100 rounded hover:bg-indigo-100 transition"
        onClick={() => handleClick()}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}
