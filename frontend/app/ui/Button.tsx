import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClickAction?: () => void
}

export default function Button({
  children,
  onClickAction,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const handleClick = () => {
    if (!disabled && onClickAction) onClickAction()
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={clsx(
          'inline-flex items-center gap-1 px-3 py-1 text-sm font-normal border rounded transition',
          disabled
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed pointer-events-none'
            : 'bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}
