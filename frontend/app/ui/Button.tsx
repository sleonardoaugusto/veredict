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
          'inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded transition border',
          disabled
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed pointer-events-none'
            : 'bg-[#1E2A38] text-white border-[#1E2A38] hover:bg-[#2B3C4F] hover:border-[#2B3C4F] cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}
